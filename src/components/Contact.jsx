import React, { useRef, useEffect, useState } from 'react'
import './Contact.css'

// Get a free access key at https://web3forms.com (just enter your email, no signup)
// then paste it here.
const WEB3FORMS_ACCESS_KEY = 'db6eb484-924f-4adf-a924-4672c54a3f5e'

export default function Contact() {
  const ref = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    ref.current.querySelectorAll('.contact__reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSending(true)

    const form = e.target
    const formData = new FormData(form)
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('subject', `New enquiry from ${formData.get('name')} — Breakwall Studios`)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const result = await res.json()

      if (result.success) {
        setSubmitted(true)
      } else {
        setError('Something went wrong sending your enquiry. Please try again or email us directly.')
      }
    } catch (err) {
      setError('Something went wrong sending your enquiry. Please try again or email us directly.')
    } finally {
      setSending(false)
    }
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
              <span className="contact__detail-value">breakwallstudios@gmail.com</span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-label">Location</span>
              <span className="contact__detail-value">WORLDWIDE</span>
            </div>
            
          </div>
          <div className="contact__socials">
            <a
              href="https://www.instagram.com/breakwallstudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social"
            >
              Instagram
            </a>
            <a
              href="https://x.com/BreakWallAgency"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social"
            >
              X
            </a>
          </div>
        </div>

        <div className="contact__right contact__reveal" style={{ transitionDelay: '0.2s' }}>
          {!submitted ? (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Your name" required />
              </div>
              <div className="contact__field">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="your@email.com" required />
              </div>
              <div className="contact__field">
                <label>Enquiry Type</label>
                <select name="enquiry_type">
                  <option>Business Advertisement</option>
                  <option>Brand Partnership</option>
                  <option>Creative direction</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div className="contact__field">
                <label>Message</label>
                <textarea rows="4" name="message" placeholder="Tell us about your project..." required />
              </div>
              {error && <p className="contact__error">{error}</p>}
              <button type="submit" className="contact__submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send Enquiry'}
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