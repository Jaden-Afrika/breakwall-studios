import React, { useState, useEffect, useRef } from 'react'
import './PortfolioGrid.css'

const FILTERS = ['All', 'Editorial', 'Runway', 'Campaign', 'Couture', 'Commercial']

const WORKS = [
  { id:1,  model:'Valerie L.',    category:'Editorial',  title:'Obsidian',      year:'2024', market:'Paris',    size:'tall',   accent:'#c9a84c', bg:'#1a1508' },
  { id:2,  model:'Aria Z.',     category:'Runway',     title:'Fractured',     year:'2024', market:'Milan',    size:'wide',   accent:'#b8922a', bg:'#120e04' },
  { id:3,  model:'Leila O.',    category:'Couture',    title:'Sovereign',     year:'2023', market:'London',   size:'square', accent:'#e2c97e', bg:'#181208' },
  { id:4,  model:'Nadia S.',    category:'Campaign',   title:'Meridian',      year:'2024', market:'NYC',      size:'tall',   accent:'#c9a84c', bg:'#0e0e0e' },
  { id:5,  model:'Imani J.',    category:'Editorial',  title:'Vantage',       year:'2023', market:'Dubai',    size:'square', accent:'#9a7a2e', bg:'#141008' },
  { id:6,  model:'Cleo B.',     category:'Commercial', title:'Parallax',      year:'2024', market:'Tokyo',    size:'wide',   accent:'#d4a840', bg:'#0c0a04' },
  { id:7,  model:'Asha M.',     category:'Runway',     title:'Veil',          year:'2024', market:'Paris',    size:'tall',   accent:'#c9a84c', bg:'#181818' },
  { id:8,  model:'Kemi T.',     category:'Couture',    title:'Bloom',         year:'2023', market:'Milan',    size:'square', accent:'#e2c97e', bg:'#141008' },
  { id:9,  model:'Sade R.',     category:'Campaign',   title:'Gravity',       year:'2024', market:'London',   size:'wide',   accent:'#b8922a', bg:'#0f0c04' },
  { id:10, model:'Tolu A.',     category:'Editorial',  title:'Monolith',      year:'2023', market:'NYC',      size:'tall',   accent:'#c9a84c', bg:'#101010' },
  { id:11, model:'Ife W.',      category:'Commercial', title:'Threshold',     year:'2024', market:'Dubai',    size:'square', accent:'#9a7a2e', bg:'#0d0b04' },
  { id:12, model:'Amara N.',    category:'Couture',    title:'Aureate',       year:'2024', market:'Tokyo',    size:'wide',   accent:'#e2c97e', bg:'#181008' },
]

export default function PortfolioGrid() {
  const [active, setActive] = useState('All')
  const [visible, setVisible] = useState([])
  const [lightbox, setLightbox] = useState(null)
  const gridRef = useRef(null)

  const filtered = active === 'All' ? WORKS : WORKS.filter(w => w.category === active)

  useEffect(() => {
    setVisible([])
    const timers = filtered.map((w, i) =>
      setTimeout(() => setVisible(v => [...v, w.id]), i * 60)
    )
    return () => timers.forEach(clearTimeout)
  }, [active])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0.1 }
    )
    gridRef.current?.querySelectorAll('.pg__card').forEach(c => obs.observe(c))
    return () => obs.disconnect()
  }, [filtered])

  return (
    <section className="pg" id="portfolio">

      {/* Filter bar */}
      <div className="pg__filters">
        <div className="pg__filters-inner">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`pg__filter ${active === f ? 'pg__filter--active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
              {active === f && <span className="pg__filter-line" />}
            </button>
          ))}
        </div>
        <span className="pg__count">{filtered.length} works</span>
      </div>

      {/* Masonry grid */}
      <div className="pg__grid" ref={gridRef}>
        {filtered.map((work, i) => (
          <div
            key={work.id}
            className={`pg__card pg__card--${work.size} ${visible.includes(work.id) ? 'pg__card--visible' : ''}`}
            style={{ transitionDelay: `${i * 0.04}s` }}
            onClick={() => setLightbox(work)}
          >
            {/* Artistic placeholder image */}
            <div className="pg__card-img" style={{ background: work.bg }}>
              <div className="pg__card-art" style={{ '--accent': work.accent }}>
                <div className="pg__art-circle" />
                <div className="pg__art-line pg__art-line--h" />
                <div className="pg__art-line pg__art-line--v" />
                <div className="pg__art-name">{work.model.split(' ')[0]}</div>
              </div>
              <div className="pg__card-hover">
                <span className="pg__hover-icon">+</span>
                <span className="pg__hover-label">View</span>
              </div>
            </div>

            <div className="pg__card-info">
              <div className="pg__card-left">
                <span className="pg__card-title">{work.title}</span>
                <span className="pg__card-model">{work.model}</span>
              </div>
              <div className="pg__card-right">
                <span className="pg__card-cat">{work.category}</span>
                <span className="pg__card-meta">{work.market} · {work.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="pg__lightbox" onClick={() => setLightbox(null)}>
          <button className="pg__lb-close" onClick={() => setLightbox(null)}>✕</button>
          <div className="pg__lb-inner" onClick={e => e.stopPropagation()}>
            <div className="pg__lb-img" style={{ background: lightbox.bg }}>
              <div className="pg__lb-art" style={{ '--accent': lightbox.accent }}>
                <div className="pg__art-circle" />
                <div className="pg__art-line pg__art-line--h" />
                <div className="pg__art-line pg__art-line--v" />
                <div className="pg__art-name" style={{ fontSize:'72px' }}>{lightbox.model.split(' ')[0]}</div>
              </div>
            </div>
            <div className="pg__lb-info">
              <span className="pg__lb-cat">{lightbox.category}</span>
              <h2 className="pg__lb-title">{lightbox.title}</h2>
              <div className="pg__lb-divider" />
              <div className="pg__lb-row"><span>Model</span><span>{lightbox.model}</span></div>
              <div className="pg__lb-row"><span>Market</span><span>{lightbox.market}</span></div>
              <div className="pg__lb-row"><span>Year</span><span>{lightbox.year}</span></div>
              <div className="pg__lb-row"><span>Category</span><span>{lightbox.category}</span></div>
              <button className="pg__lb-btn" onClick={() => setLightbox(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
