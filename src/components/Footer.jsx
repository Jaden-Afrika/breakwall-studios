import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo">Breakwall Studios</div>
          <p className="footer__tagline">Representing excellence since 2013</p>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <h4>Talent</h4>
            <ul>
              <li><a href="#">Women</a></li>
              <li><a href="#">Men</a></li>
              <li><a href="#">New Faces</a></li>
              <li><a href="#">Alumni</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Agency</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Follow</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Pinterest</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Breakwall Studios. All rights reserved.</span>
        <span>Nairobi, Kenya</span>
      </div>
    </footer>
  )
}
