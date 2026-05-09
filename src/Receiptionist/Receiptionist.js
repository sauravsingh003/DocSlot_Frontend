import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserPlus, FaUsers, FaBars } from "react-icons/fa";

import ReceiptionistNavbar from "./ReceiptionistNavbar";
import "./Styles.css";

function Receiptionist({ children }) {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (role === "DOCTOR") {
      navigate("/doctor");
    } else if (role === "PATIENT") {
      navigate("/");
    } else if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "RECEPTIONIST") {
      navigate("/receiptionist");
    }
  }, [navigate]);

  return (
    <>
      <ReceiptionistNavbar />
      <div className="layout-container">
        {/* Toggle for mobile */}
        <button
          className="sidebar-toggle"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <FaBars /> Menu
        </button>

        {/* Sidebar */}
        <div
          className={`sidebar ${showSidebar ? "d-block" : "d-none"} d-md-flex`}
        >
          <div className="sidebar-header">Receptionist</div>
          <nav className="sidebar-nav">
            <NavLink
              to="/receiptionist/addPatient"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              onClick={() => setShowSidebar(false)}
            >
              <FaUserPlus className="icon" /> Add Patient
            </NavLink>
            <NavLink
              to="/receiptionist/viewPatients"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              onClick={() => setShowSidebar(false)}
            >
              <FaUsers className="icon" /> View Patients
            </NavLink>
          </nav>
        </div>

        {/* Main content */}
        <div className="main-content">{children}</div>
      </div>
    </>
  );
}

export default Receiptionist;