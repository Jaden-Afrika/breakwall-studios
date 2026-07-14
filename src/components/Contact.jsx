import React, { useRef, useEffect, useState } from 'react'
import './Contact.css'

export default function Contact() {
  const ref = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    ref.current.querySelectorAll('.contact__reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact__inner">
        <div className="contact__left contact__reveal">
          <div className="contact__label">
            <span className="contact__label-line" />
            <span>Get in Touch</span>
          </div>
          <h2 className="contact__heading">
            Let's Build<br />Something<br /><em>Unforgettable</em>
          </h2>
          <div className="contact__details">
            <div className="contact__detail">
              <span className="contact__detail-label">Email</span>
              <span className="contact__detail-value">hello@breakwallstudios.com</span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-label">Location</span>
              <span className="contact__detail-value">Westlands, Nairobi, KE</span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-label">Bookings</span>
              <span className="contact__detail-value">bookings@breakwallstudios.com</span>
            </div>
          </div>
          <div className="contact__socials">
            {['Instagram', 'LinkedIn', 'Pinterest'].map(s => (
              <a key={s} href="#" className="contact__social">{s}</a>
            ))}
          </div>
        </div>

        <div className="contact__right contact__reveal" style={{ transitionDelay: '0.2s' }}>
          {!submitted ? (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label>Full Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="contact__field">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
              <div className="contact__field">
                <label>Enquiry Type</label>
                <select>
                  <option>Model Representation</option>
                  <option>Brand Partnership</option>
                  <option>Editorial Booking</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div className="contact__field">
                <label>Message</label>
                <textarea rows="4" placeholder="Tell us about your project..." required />
              </div>
              <button type="submit" className="contact__submit">
                Send Enquiry
              </button>
            </form>
          ) : (
            <div className="contact__success">
              <div className="contact__success-icon">✦</div>
              <h3>Thank you.</h3>
              <p>We'll be in touch within 48 hours.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
