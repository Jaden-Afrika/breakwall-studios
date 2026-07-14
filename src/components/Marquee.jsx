import React from 'react'
import './Marquee.css'

const items = ['Editorial', 'Commercial', 'Runway', 'Campaign', 'Lifestyle', 'Haute Couture', 'Breakwall Studios', 'Print', 'Digital']

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <React.Fragment key={i}>
            <span className="marquee-item">{item}</span>
            <span className="marquee-dot">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
