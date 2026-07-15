// Vercel Serverless Function — /api/chat
// Keeps the Gemini API key on the server. Never exposed to the browser.

// Crude in-memory rate limiter: caps each IP to RATE_LIMIT requests per RATE_WINDOW_MS.
// Note: Vercel serverless instances are ephemeral and can scale horizontally, so this
// resets on cold starts and isn't shared across instances — it's a speed bump against
// casual abuse/runaway loops, not a hard guarantee. For stronger protection, back this
// with a shared store (e.g. Upstash Redis) or Vercel's Edge Config / WAF rate limiting.
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 5 * 60 * 1000 // 5 minutes
const MAX_MESSAGE_LENGTH = 1000
const requestLog = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const timestamps = (requestLog.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS)
  timestamps.push(now)
  requestLog.set(ip, timestamps)

  if (requestLog.size > 5000) {
    const oldestKey = requestLog.keys().next().value
    requestLog.delete(oldestKey)
  }

  return timestamps.length > RATE_LIMIT
}

const SYSTEM_PROMPT = `You are the virtual assistant for Breakwall Studios, an advertising and creative firm based in Nairobi, founded in 2026 by Jaden Afrika (Founder & Creative Director).

ABOUT BREAKWALL STUDIOS:
- Breakwall Studios is an advertising and creative firm focused on campaigns, brand storytelling, and modern visual culture.
- We work with emerging talent, including AI models and next-generation creative collaborators, to build work that feels contemporary, distinctive, and commercially strong.
- Our approach blends creativity, strategy, and innovation with a strong editorial sensibility.
- Core values: Vision, Integrity, Excellence, Legacy.

SERVICES WE OFFER:
1. Advertising Strategy — creating campaigns and brand narratives that are sharp, premium, and culturally relevant.
2. Creative Direction — shaping concepts, tone, and visual execution for standout brand work.
3. AI Model & Talent Partnerships — connecting brands with innovative digital talent and AI-led creative collaborators.
4. Global Brand Support — helping projects scale across markets with thoughtful, modern support.

CONTACT INFO:
- General enquiries: breakwallstudios@gmail.com
- Bookings: breakwallstudios@gmail.com
- Location: Worldwide

YOUR ROLE:
- Answer visitor questions about Breakwall Studios warmly, confidently, and concisely (2-4 sentences max per reply).
- If someone wants to discuss a campaign, creative collaboration, advertising, or talent partnerships, direct them to the contact form on the site or breakwallstudios@gmail.com.
- Maintain a polished, editorial tone — confident, warm, never robotic or overly salesy.
- If you don't know something specific, say so honestly and point them to the contact form rather than guessing.
- Keep responses short. This is a chat widget, not an essay.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a few minutes and try again.' });
  }

  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: 'Message is too long' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfigured: missing API key' });
  }

  try {
    // Build conversation contents for Gemini: system prompt injected as first turn context
    const contents = [];

    if (Array.isArray(history)) {
      for (const turn of history.slice(-20)) {
        if (typeof turn?.text !== 'string') continue;
        contents.push({
          role: turn.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: turn.text.slice(0, MAX_MESSAGE_LENGTH) }],
        });
      }
    }

    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', errText);
      return res.status(502).json({ error: 'Upstream AI service error' });
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response just now. Please try again.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat handler error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}