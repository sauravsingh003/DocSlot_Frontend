import React from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <NavLink className="footer-logo" to="/">
              <span>D</span>
              DocSlot
            </NavLink>
            <p>
              Hassle-free doctor appointment scheduling for patients, clinics,
              and healthcare teams.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/services">Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/bookappointment">Book Appointment</NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>123 Health Avenue</li>
              <li>Bengaluru, India</li>
              <li>
                <a href="mailto:teamdocslot@gmail.com">teamdocslot@gmail.com</a>
              </li>
              <li>
                <a href="tel:+919876500000">+91 98765 00000</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Follow</h4>
            <div className="footer-socials">
              <a href="https://www.linkedin.com/in/saurav-singh-348694246/" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/sauravsingh003" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.facebook.com/" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://x.com/" aria-label="X">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 DocSlot. All rights reserved.</span>
          <span>Online Appointment System</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
