import React, { useEffect, useRef } from 'react'
import heroImg from '../hero2.jpeg'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, particles = [], animId

    function resize() {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    class Particle {
      constructor(init) {
        this.x = Math.random() * W
        this.y = init ? Math.random() * H : H + 2
        this.vy = -(0.2 + Math.random() * 0.5)
        this.vx = (Math.random() - 0.5) * 0.2
        this.life = 0
        this.maxLife = 180 + Math.random() * 260
        this.size = 0.5 + Math.random() * 1.2
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.life++
        if (this.life > this.maxLife || this.y < -5) Object.assign(this, new Particle(false))
      }
      draw() {
        const a = Math.sin((this.life / this.maxLife) * Math.PI) * 0.5
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${a})`
        ctx.fill()
      }
    }

    resize()
    for (let i = 0; i < 70; i++) particles.push(new Particle(true))

    let t = 0
    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Soft gold gradient wash
      const grd = ctx.createRadialGradient(W * 0.75, H * 0.3, 0, W * 0.75, H * 0.3, W * 0.6)
      grd.addColorStop(0, 'rgba(201,168,76,0.06)')
      grd.addColorStop(1, 'rgba(250,248,244,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, W, H)

      // Diagonal faint lines
      ctx.strokeStyle = 'rgba(201,168,76,0.04)'
      ctx.lineWidth = 0.5
      for (let i = -4; i < 12; i++) {
        ctx.beginPath()
        ctx.moveTo(i * (W / 7), 0)
        ctx.lineTo(i * (W / 7) + H * 0.4, H)
        ctx.stroke()
      }

      particles.forEach(p => { p.update(); p.draw() })
      t++
      animId = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="hero" id="home" style={{ backgroundImage: `url(${heroImg})` }}>
      <canvas ref={canvasRef} className="hero__canvas" />

      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__line" />
          <span>Est. 2026 · Earth</span>
          <span className="hero__line" />
        </div>

        <h1 className="hero__heading">
          <span className="hero__heading-row">Where</span>
          <span className="hero__heading-row hero__heading-row--italic">Form</span>
          <span className="hero__heading-row hero__heading-row--gold">Breaks</span>
          <span className="hero__heading-row">The Wall</span>
        </h1>

        <p className="hero__sub">
          Representing exceptional talent across fashion,<br />
          editorial & commercial — globally.
        </p>

        <div className="hero__actions">
          <a href="#talent" className="hero__btn hero__btn--primary">View Roster</a>
          <a href="#about" className="hero__btn hero__btn--ghost">Our Story</a>
        </div>
      </div>

      <div className="hero__stats">
        <div className="hero__stat">
          <span className="hero__stat-num">5<em>+</em></span>
          <span className="hero__stat-label">Models</span>
        </div>
        <div className="hero__stat-divider" />
        <div className="hero__stat">
          <span className="hero__stat-num">18</span>
          <span className="hero__stat-label">Markets</span>
        </div>
        <div className="hero__stat-divider" />
        <div className="hero__stat">
          <span className="hero__stat-num"><em></em></span>
          <span className="hero__stat-label"></span>
        </div>
      </div>
      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
