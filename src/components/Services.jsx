import React, { useEffect, useRef } from 'react'
import './Services.css'

const services = [
  {
    num: '01',
    title: 'Advertising Strategy',
    desc: 'We develop campaigns that feel premium, clear, and culturally resonant — from positioning to visual storytelling.',
    tag: 'Strategy'
  },
  {
    num: '02',
    title: 'Creative Direction',
    desc: 'We shape concepts, tone, and execution for brand work that stands out and stays memorable across digital and editorial spaces.',
    tag: 'Creative'
  },
  {
    num: '03',
    title: 'AI Model Partnerships',
    desc: 'We connect brands with emerging AI talent and innovative digital creators, building work that feels contemporary and future-facing.',
    tag: 'AI'
  },
  {
    num: '04',
    title: 'Global Brand Support',
    desc: 'We support rollout, positioning, and collaboration across markets with a sharp understanding of modern brand environments.',
    tag: 'Global'
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
        <h2 className="services__heading">Crafted for<br /><em>Impact</em></h2>
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
