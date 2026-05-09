import React from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";

function Services() {
  const navigate = useNavigate();

  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Everything you need for convenient and efficient healthcare</p>
      </div>

      <div className="services-grid">
        <div className="service-card">
          <h3>Appointment Booking</h3>
          <p>Instantly book appointments with your preferred doctor anytime.</p>
        </div>
        <div className="service-card">
          <h3>Doctor Search</h3>
          <p>Find specialists by location, availability, and expertise.</p>
        </div>
        <div className="service-card">
          <h3>Telemedicine</h3>
          <p>Consult doctors remotely via secure video calls and chat.</p>
        </div>
        <div className="service-card">
          <h3>Digital Records</h3>
          <p>Access your appointment history and medical records anytime.</p>
        </div>
        <div className="service-card">
          <h3>Reminders & Notifications</h3>
          <p>Never miss an appointment with SMS and email alerts.</p>
        </div>
        <div className="service-card">
          <h3>Multi-Role Support</h3>
          <p>Separate dashboards for Admin, Doctor, Receptionist, and Patient.</p>
        </div>
      </div>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}

export default Services;
