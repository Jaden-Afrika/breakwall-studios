import React, { useState, useRef, useEffect } from 'react'
import './ChatWidget.css'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello — welcome to Breakwall Studios. I'm here to answer questions about our agency, services, or how to get in touch. How can I help?" }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  async function sendMessage(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage = { role: 'user', text: trimmed }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: newMessages.slice(0, -1), // everything except the message we just sent
        }),
      })

      if (!response.ok) throw new Error('Request failed')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: "I'm having trouble connecting right now. Please try again shortly, or reach us directly at breakwallstudios@gmail .com." }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-widget__window">
          <div className="chat-widget__header">
            <span className="chat-widget__header-title">Breakwall Studios</span>
            <button
              className="chat-widget__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chat-widget__messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-widget__bubble chat-widget__bubble--${m.role}`}>
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-widget__bubble chat-widget__bubble--assistant chat-widget__bubble--typing">
                <span></span><span></span><span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-widget__input-row" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask us anything..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M2 10L18 2L11 18L9 11L2 10Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        className="chat-widget__toggle"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '×' : '✦'}
      </button>
    </div>
  )
}
