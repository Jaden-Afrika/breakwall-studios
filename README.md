# Breakwall Studios

Breakwall Studios is a modern landing page for a creative agency focused on advertising, brand storytelling, and AI-generated talent visuals. The site is built with React and Vite, with a polished editorial aesthetic and a responsive layout.

## What’s included
- A full-screen hero section with animated canvas details
- A services section for advertising, creative direction, and AI talent partnerships
- A talent showcase featuring AI-generated model visuals and a disclaimer
- An about section that explains the studio’s creative positioning
- A contact section with an enquiry form
- A floating chat assistant powered by a serverless API endpoint

## Tech stack
- React 18
- Vite 5
- CSS Modules-style component styling via plain CSS files
- Google Fonts: Cormorant Garamond and Montserrat

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
    Navbar.jsx / .css
    Hero.jsx / .css
    Marquee.jsx / .css
    Services.jsx / .css
    Talent.jsx / .css
    About.jsx / .css
    Contact.jsx / .css
    Footer.jsx / .css
    ChatWidget.jsx / .css
  App.jsx
  main.jsx
  index.css
api/
  chat.js
index.html
package.json
vite.config.js
```

## Deployment

### Vercel
1. Push the project to GitHub
2. Import it into Vercel
3. Deploy

### Netlify
1. Run `npm run build`
2. Upload the generated `dist/` folder

## Notes
- The chat assistant relies on a server-side API route in the `api/` folder.
- The talent section uses AI-generated visuals and includes a disclaimer for clarity.

© 2026 Breakwall Studios
