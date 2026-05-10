import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaUserTie,
  FaHospitalSymbol,
  FaStethoscope,
  FaClipboardList,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import "./Styles.css";

function Admin({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (role === "DOCTOR") {
      navigate("/doctor");
    } else if (role === "PATIENT") {
      navigate("/");
    } else if (role === "RECEPTIONIST") {
      navigate("/receiptionist");
    }
  }, [navigate]);

  useEffect(() => {
    setShowSidebar(false);
  }, [location.pathname]);

  return (
    <>
      <AdminNavbar />
      <div className="layout-container admin-layout-container">
        {/* Sidebar Toggle Button (visible only on small screens) */}
        {!showSidebar && (
          <button
            className="btn btn-outline-light d-md-none sidebar-toggle"
            type="button"
            aria-expanded={showSidebar}
            aria-controls="admin-sidebar"
            onClick={() => setShowSidebar(true)}
          >
            <FaBars /> Menu
          </button>
        )}

        {/* Sidebar */}
        <aside
          id="admin-sidebar"
          className={`sidebar bg-light ${showSidebar ? "open" : ""}`}
        >
          <button
            className="sidebar-close d-md-none"
            type="button"
            aria-label="Close sidebar"
            onClick={() => setShowSidebar(false)}
          >
            <FaTimes />
          </button>
          <div className="sidebar-header">Admin</div>
          <nav className="sidebar-nav">
            <NavLink
              to="/admin/addSpeciality"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaHospitalSymbol className="icon" /> Add Speciality
            </NavLink>
            <NavLink
              to="/admin/addDoctor"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUserMd className="icon" /> Add Doctor
            </NavLink>
            <NavLink
              to="/admin/addReceptionist"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUserTie className="icon" /> Add Receptionist
            </NavLink>
            <NavLink
              to="/admin/viewDoctors"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaStethoscope className="icon" /> View Doctors
            </NavLink>
            <NavLink
              to="/admin/viewReceptionist"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaClipboardList className="icon" /> View Receptionist
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="main-content">{children || <Outlet />}</div>
      </div>
    </>
  );
}

export default Admin;
