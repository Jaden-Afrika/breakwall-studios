import React, { useEffect, useRef } from 'react'
import VL from './VL.jpeg'
import AZ from './AZ.jpeg'
import './Talent.css'

const models = [
  { name: 'Valerie Lucia', category: 'Editorial / Runway', market: 'Miami · Bucharest', initials: 'VL', image: VL },
  { name: 'Aria Zawadi', category: 'Commercial / Print', market: 'Cape Town · Miami', initials: 'AZ', image: AZ },
  { name: 'Leila O.', category: 'Haute Couture', market: 'Nairobi · London', initials: 'LO' },
  { name: 'Nadia S.', category: 'Lifestyle / Digital', market: 'Nairobi · NYC', initials: 'NS' },
  { name: 'Imani J.', category: 'Runway / Editorial', market: 'Nairobi · Dubai', initials: 'IJ' },
  { name: 'Angela Nelima.', category: 'Campaign / Print', market: 'Nairobi · Tokyo', initials: 'AN' },
]

const COLORS = [
  ['#f0e4c2','#c9a84c'],
  ['#e8e0d8','#9a7a2e'],
  ['#f4ece0','#c9a84c'],
  ['#ede6da','#b8922a'],
  ['#f2eadf','#c9a84c'],
  ['#e6ddd2','#9a7a2e'],
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
                backgroundImage: m.image
                  ? `url(${m.image})`
                  : `linear-gradient(160deg, ${COLORS[i][0]}, ${COLORS[i][1]}33)`,
                backgroundSize: m.image ? 'cover' : 'auto',
                backgroundPosition: m.image ? 'center' : '0 0',
                backgroundRepeat: m.image ? 'no-repeat' : 'repeat',
              }}
            >
              {!m.image && (
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
