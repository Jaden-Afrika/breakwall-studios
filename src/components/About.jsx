import React, { useEffect, useRef } from 'react'
import './About.css'

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.2 }
    )
    ref.current.querySelectorAll('.about__reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about__inner">
        <div className="about__left about__reveal">
          <div className="about__label">
            <span className="about__label-line" />
            <span>Our Story</span>
          </div>
          <h2 className="about__heading">
            Built on<br /><em>Boldness.</em><br />Defined by<br />Standard.
          </h2>
          <div className="about__ornament">✦</div>
        </div>

        <div className="about__right about__reveal" style={{ transitionDelay: '0.2s' }}>
          <p className="about__body">
            Founded in 2026, Breakwall Studios emerged from a singular conviction — that all talent deserved a world-class platform. We broke through walls of convention to build an agency where artistry and ambition meet.
          </p>
          <p className="about__body">
            Today, we represent over 4 models across 18 global markets. Our portfolio spans editorial, haute couture, commercial campaigns, and digital. Every talent we sign is nurtured with the precision of craft and the patience of vision.
          </p>
          <div className="about__signature">
            <span className="about__sig-name">Jaden Afrika</span>
            <span className="about__sig-title">Founder & Creative Director</span>
          </div>
          <a href="#contact" className="about__link">
            <span>Work With Us</span>
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <path d="M0 5H18M14 1L18 5L14 9" stroke="currentColor" strokeWidth="0.8"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="about__pillars">
        {['Vision', 'Integrity', 'Excellence', 'Legacy'].map((p, i) => (
          <div key={p} className="about__pillar about__reveal" style={{ transitionDelay: `${0.1 * i}s` }}>
            <span className="about__pillar-num">0{i + 1}</span>
            <span className="about__pillar-text">{p}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
