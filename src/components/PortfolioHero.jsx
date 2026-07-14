import React from 'react'
import './PortfolioHero.css'

export default function PortfolioHero() {
  return (
    <section className="ph">
      <div className="ph__bg">
        <div className="ph__grid">
          {Array.from({length: 20}).map((_,i) => <div key={i} className="ph__grid-cell" />)}
        </div>
        <div className="ph__glow ph__glow--1" />
        <div className="ph__glow ph__glow--2" />
      </div>

      <div className="ph__content">
        <div className="ph__eyebrow">
          <span className="ph__eyebrow-line" />
          <span>Breakwall Studios</span>
          <span className="ph__dot">✦</span>
          <span>Portfolio</span>
          <span className="ph__eyebrow-line" />
        </div>

        <h1 className="ph__heading">
          <span className="ph__h-row">The</span>
          <span className="ph__h-row ph__h-row--indent">
            <em>Work</em>
          </span>
        </h1>

        <p className="ph__sub">
          240+ models. 18 markets. Every image tells a story<br />
          of precision, beauty, and uncompromising vision.
        </p>

        <div className="ph__meta">
          <div className="ph__meta-item">
            <span className="ph__meta-num">380</span>
            <span className="ph__meta-label">Campaigns</span>
          </div>
          <div className="ph__meta-sep" />
          <div className="ph__meta-item">
            <span className="ph__meta-num">64</span>
            <span className="ph__meta-label">Covers</span>
          </div>
          <div className="ph__meta-sep" />
          <div className="ph__meta-item">
            <span className="ph__meta-num">18</span>
            <span className="ph__meta-label">Markets</span>
          </div>
        </div>
      </div>

      <div className="ph__scroll">
        <div className="ph__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
