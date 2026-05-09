import React from "react";
import "./Section1.css";

function Section1() {
  return (
    <div className="section1-container">
      <div className="text-content">
        <h2 style={{ color: "#076cea" }} className="fw-bold fs-1 mb-4">
          DocSlot: The Appointment Booking System
        </h2>
        <p className="fs-5">
          The DocSlot Online Appointment System is designed to simplify and streamline
          healthcare scheduling for both patients and medical professionals. With an
          easy-to-use interface, users can book, reschedule, or cancel appointments
          anytime, from anywhere. The system offers real-time doctor availability,
          automated reminders, and access to appointment history — all securely stored
          in one place. Whether for in-person consultations or telemedicine, DocSlot's
          digital solution ensures a smooth and efficient experience, helping patients
          get the care they need without the wait.
        </p>
      </div>

      <img
        src="/assests/img4.jpg"
        alt="Online Appointment System"
        className="center-image"
      />
    </div>
  );
}

export default Section1;
