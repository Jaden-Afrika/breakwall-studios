# Breakwall Studios — Landing Page

A luxury modelling agency website built with React + Vite.

## Stack
- React 18
- Vite 5
- Pure CSS (no CSS frameworks)
- Google Fonts: Cormorant Garamond + Montserrat

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy (free)

### Vercel (recommended)
1. Push this folder to a GitHub repo
2. Go to vercel.com → Import Project
3. Select your repo → Deploy
4. Done — live in 60 seconds

### Netlify
1. Run `npm run build`
2. Drag the `dist/` folder to netlify.com/drop

## Project Structure

```
src/
  components/
    Navbar.jsx / .css     ← Sticky nav with scroll effect
    Hero.jsx / .css       ← Full-screen hero with canvas animation
    Marquee.jsx / .css    ← Scrolling ticker
    Services.jsx / .css   ← 4-column services grid
    Talent.jsx / .css     ← Model roster cards
    About.jsx / .css      ← Agency story (dark section)
    Contact.jsx / .css    ← Contact form + details
    Footer.jsx / .css     ← Footer with links
  App.jsx                 ← Root component
  main.jsx                ← React entry point
  index.css               ← Global variables + resets
index.html                ← HTML shell
vite.config.js
package.json
```

## Customisation

- **Colors**: edit `--gold`, `--white`, `--charcoal` in `src/index.css`
- **Fonts**: swap the Google Fonts import in `index.html`
- **Content**: update copy in each component
- **Talent cards**: add real model photos by replacing the gradient placeholders in `Talent.jsx`

---
© 2026 Breakwall Studios
