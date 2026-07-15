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
            Built for<br /><em>Advertising.</em><br />Driven by<br />Creativity.
          </h2>
          <div className="about__ornament">✦</div>
        </div>

        <div className="about__right about__reveal" style={{ transitionDelay: '0.2s' }}>
          <p className="about__body">
            Breakwall Studios is an advertising and creative firm shaping campaigns with a sharp eye for culture, storytelling, and innovation. We work at the intersection of brand strategy, visual direction, and emerging digital talent.
          </p>
          <p className="about__body">
            Our focus includes AI models and next-generation creative partnerships, blending human taste with technology to build work that feels contemporary, distinctive, and commercially strong.
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
