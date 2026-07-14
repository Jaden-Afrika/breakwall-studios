import React from 'react'
import Navbar from '../components/Navbar'
import PortfolioHero from '../components/PortfolioHero'
import Marquee from '../components/Marquee'
import PortfolioGrid from '../components/PortfolioGrid'
import Footer from '../components/Footer'

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <PortfolioHero />
      <Marquee />
      <PortfolioGrid />
      <Footer />
    </>
  )
}
