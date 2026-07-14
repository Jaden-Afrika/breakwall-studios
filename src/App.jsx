import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import Talent from './components/Talent'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Portfolio from './pages/Portfolio'
import ChatWidget from './components/ChatWidget'

export default function App() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
  const isPortfolioPage = currentPath === '/portfolio'

  if (isPortfolioPage) {
    return <Portfolio />
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Talent />
      <About />
      <Contact />
      <Footer />
      <ChatWidget />
    </>
  )
}
