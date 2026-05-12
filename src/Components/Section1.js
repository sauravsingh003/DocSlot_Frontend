import React from "react";
import { FaBell, FaClock, FaFileMedical } from "react-icons/fa6";
import "./Section1.css";

function Section1() {
  return (
    <section className="care-flow-section">
      <div className="container care-flow-grid">
        <div className="care-flow-image">
          <img
            src="/assests/img4.jpg"
            alt="Healthcare professional helping with online appointment booking"
            loading="lazy"
          />
        </div>

        <div className="care-flow-content">
          <span>Built for real clinics</span>
          <h2>Manage appointments from discovery to follow-up.</h2>
          <p>
            DocSlot streamlines healthcare scheduling for patients and medical
            teams. Users can book appointments, review appointment history, and
            get care updates through one simple digital workflow.
          </p>

          <div className="care-flow-points">
            <div>
              <FaClock />
              <strong>Real-time availability</strong>
              <small>Help patients choose a suitable slot faster.</small>
            </div>
            <div>
              <FaBell />
              <strong>Appointment reminders</strong>
              <small>Reduce missed appointments with timely updates.</small>
            </div>
            <div>
              <FaFileMedical />
              <strong>Visit history</strong>
              <small>Keep previous appointments accessible and organized.</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section1;
