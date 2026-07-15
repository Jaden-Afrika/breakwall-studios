import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo">Breakwall Studios</div>
          <p className="footer__tagline">Representing excellence</p>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <h4></h4>
            
            
          </div>
          <div className="footer__col">
            <h4>Agency</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4></h4>
            <ul>
            
        
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Breakwall Studios. All rights reserved.</span>
        <span>WORLDWIDE</span>
      </div>
    </footer>
  )
}
