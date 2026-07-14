import React, { useEffect, useRef } from 'react'
import './Services.css'

const services = [
  {
    num: '01',
    title: 'Model Development',
    desc: 'We discover raw potential and sculpt careers with precision — from a model\'s first booking to a sustained global presence across markets.',
    tag: 'Development'
  },
  {
    num: '02',
    title: 'Brand Partnerships',
    desc: 'Brokering meaningful relationships between world-class talent and the most aspirational labels, editorial houses, and campaign directors.',
    tag: 'Commercial'
  },
  {
    num: '03',
    title: 'Editorial Direction',
    desc: 'Elevating shoots and campaigns with a distinctive editorial vision that commands attention, earns covers, and drives cultural conversation.',
    tag: 'Editorial'
  },
  {
    num: '04',
    title: 'Global Placement',
    desc: 'Our network spans 18 markets. We manage international placements, travel bookings, and cross-border licensing with seamless precision.',
    tag: 'International'
  }
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.15 }
    )
    const cards = sectionRef.current.querySelectorAll('.service-card')
    cards.forEach(c => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="services__header">
        <div className="services__label">
          <span className="services__label-line" />
          <span>What We Do</span>
        </div>
        <h2 className="services__heading">Crafted for<br /><em>Excellence</em></h2>
      </div>

      <div className="services__grid">
        {services.map((s, i) => (
          <div
            key={s.num}
            className="service-card"
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className="service-card__top">
              <span className="service-card__num">{s.num}</span>
              <span className="service-card__tag">{s.tag}</span>
            </div>
            <h3 className="service-card__title">{s.title}</h3>
            <p className="service-card__desc">{s.desc}</p>
            <div className="service-card__arrow">
              <span>Explore</span>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path d="M0 5H18M14 1L18 5L14 9" stroke="currentColor" strokeWidth="0.8"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
