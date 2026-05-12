import React, { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

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

    const token = sessionStorage.getItem("jwtToken");
    const role = sessionStorage.getItem("userRole");

    console.log("Admin Token:", token);
    console.log("Admin Role:", role);
    console.log("Role type:", typeof role);
    console.log("Role length:", role?.length);
    console.log("Role charCodes:", role?.split('').map(c => c.charCodeAt(0)));

    // If not logged in
    if (!token) {
      console.log("No token, redirecting to /");
      navigate("/");
      return;
    }

    // Trim the role to remove any whitespace
    const trimmedRole = role ? role.trim() : "";

    console.log("Trimmed role:", trimmedRole);
    console.log("Is ROLE_ADMIN?", trimmedRole === "ROLE_ADMIN");

    // Allow only admin
    if (trimmedRole !== "ROLE_ADMIN") {
      console.log("Not admin, role is:", trimmedRole, "redirecting to /");
      // Prevent non-admin users
      if (trimmedRole === "ROLE_DOCTOR") {
        navigate("/doctor");
        return;
      }

      if (trimmedRole === "ROLE_PATIENT") {
        navigate("/");
        return;
      }

      if (trimmedRole === "ROLE_RECEPTIONIST") {
        navigate("/receiptionist");
        return;
      }

      navigate("/");
      return;
    }

    console.log("User is admin, allowing access");

  }, [navigate]);

  // Auto close sidebar on route change
  useEffect(() => {
    setShowSidebar(false);
  }, [location.pathname]);

  return (
    <>
      <AdminNavbar />

      <div className="layout-container admin-layout-container">

        {/* Mobile Sidebar Toggle */}
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
          className={`sidebar bg-light ${
            showSidebar ? "open" : ""
          }`}
        >

          <button
            className="sidebar-close d-md-none"
            type="button"
            aria-label="Close sidebar"
            onClick={() => setShowSidebar(false)}
          >
            <FaTimes />
          </button>

          <div className="sidebar-header">
            Admin
          </div>

          <nav className="sidebar-nav">

            <NavLink
              to="/admin/addSpeciality"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <FaHospitalSymbol className="icon" />
              Add Speciality
            </NavLink>

            <NavLink
              to="/admin/addDoctor"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <FaUserMd className="icon" />
              Add Doctor
            </NavLink>

            <NavLink
              to="/admin/addReceptionist"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <FaUserTie className="icon" />
              Add Receptionist
            </NavLink>

            <NavLink
              to="/admin/viewDoctors"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <FaStethoscope className="icon" />
              View Doctors
            </NavLink>

            <NavLink
              to="/admin/viewReceptionist"
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <FaClipboardList className="icon" />
              View Receptionist
            </NavLink>

          </nav>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          {children || <Outlet />}
        </div>

      </div>
    </>
  );
}

export default Admin;