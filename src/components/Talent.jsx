import React, { useEffect, useRef } from 'react'
import VL from './VL.jpeg'
import AZ from './AZ.jpeg'
import KH from './KH.jpeg'
import './Talent.css'

const models = [
  { name: 'Valerie Lucia', category: 'Editorial / Runway', market: 'Miami · Bucharest', initials: 'VL', image: VL },
  { name: 'Aria Zawadi', category: 'Commercial / Print', market: 'Cape Town · Miami', initials: 'AZ', image: AZ },
  { name: 'Kali H', category: 'Haute Couture', market: 'Nairobi · London', initials: 'KH', image: KH },
]

const COLORS = [
  ['#f0e4c2','#c9a84c'],
  ['#e8e0d8','#9a7a2e'],
  ['#f4ece0','#c9a84c'],
]

export default function Talent() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    sectionRef.current.querySelectorAll('.talent-card').forEach(c => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="talent" id="talent" ref={sectionRef}>
      <div className="talent__header">
        <div className="talent__label">
          <span className="talent__label-line" />
          <span>Our Talent</span>
        </div>
        <h2 className="talent__heading">The <em>Faces</em><br />of Breakwall</h2>
        <p className="talent__disclaimer">
          All faces shown are completely AI-generated. No one’s image or likeness is copied or replicated.
        </p>
        <a href="#contact" className="talent__view-all">View Full Roster →</a>
      </div>

      <div className="talent__grid">
        {models.map((m, i) => (
          <div
            key={m.name}
            className="talent-card"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div
              className="talent-card__photo"
              style={{
                background: m.image
                  ? 'transparent'
                  : `linear-gradient(160deg, ${COLORS[i][0]}, ${COLORS[i][1]}33)`,
              }}
            >
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  decoding="async"
                  className="talent-card__image"
                />
              ) : (
                <>
                  <div className="talent-card__initials" style={{ color: COLORS[i][1] }}>
                    {m.initials}
                  </div>
                  <div className="talent-card__overlay">
                    <span>View Profile</span>
                  </div>
                </>
              )}
            </div>
            <div className="talent-card__info">
              <span className="talent-card__name">{m.name}</span>
              <span className="talent-card__category">{m.category}</span>
              <span className="talent-card__market">{m.market}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
