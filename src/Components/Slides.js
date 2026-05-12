import React from "react";
import { FaArrowRight, FaCalendarCheck, FaMagnifyingGlass } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import "./Slides.css";

function Slides() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-kicker">
            <FaCalendarCheck />
            Smart healthcare scheduling
          </div>

          <h1>Book trusted doctors without the waiting-room stress.</h1>
          <p>
            DocSlot helps patients discover specialists, check availability, and
            manage appointments through a clean online experience built for modern
            clinics and hospitals.
          </p>

          <div className="hero-actions">
            <NavLink className="btn btn-gradient" to="/bookappointment">
              Book Appointment
              <FaArrowRight />
            </NavLink>
            <a className="btn btn-outline-soft" href="#specializations">
              <FaMagnifyingGlass />
              Explore Doctors
            </a>
          </div>

          <div className="hero-trust-row" aria-label="DocSlot care highlights">
            <span>Verified doctors</span>
            <span>Secure bookings</span>
            <span>Real-time schedules</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Doctor consultation illustration">
          <div className="hero-image-card">
            <img
              src="/assests/heroImg.png"
              alt="Doctor ready to help patients book appointments"
              loading="eager"
            />
          </div>
          <div className="hero-floating-card hero-floating-card-top">
            <strong>12 min</strong>
            <span>Average booking time saved</span>
          </div>
          <div className="hero-floating-card hero-floating-card-bottom">
            <strong>4.9/5</strong>
            <span>Patient satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Slides;
