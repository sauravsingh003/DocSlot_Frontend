import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import { BsCalendarCheckFill, BsPersonCircle } from "react-icons/bs";
import { FaBars, FaXmark } from "react-icons/fa6";

function CustomerNavbar() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const dropdownTimeoutRef = React.useRef(null);
  
  // Debug: log userId to verify it's being set correctly
  React.useEffect(() => {
    console.log("Customer Navbar - userId:", userId);
  }, [userId]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleProfileMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsProfileDropdownOpen(true);
  };

  const handleProfileMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProfileDropdownOpen(false);
    }, 150);
  };

  const handleLoginClick = () => {
    closeMenu();
    navigate("/login");
  };
  const handleRegisterClick = () => {
    closeMenu();
    navigate("/register");
  };
  const handleLogoutClick = () => {
    sessionStorage.removeItem("userId");
    closeMenu();
    navigate("/");
  };

  return (
    <nav className="docslot-navbar">
      <div className="container docslot-navbar-inner">
        <NavLink className="docslot-brand" to="/" onClick={closeMenu}>
          <span className="brand-mark">D</span>
          <span className="logo-style1">DocSlot</span>
        </NavLink>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-controls="docslot-nav-menu"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <FaXmark /> : <FaBars />}
        </button>

        <div
          className={`docslot-nav-menu ${isMenuOpen ? "is-open" : ""}`}
          id="docslot-nav-menu"
        >
          <ul className="docslot-nav-links">
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMenu}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" onClick={closeMenu}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/viewappointments" onClick={closeMenu}>
                <BsCalendarCheckFill />
                Appointments
              </NavLink>
            </li>
          </ul>

          <div
            className="profile-menu"
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <button
              className="profile-trigger"
              type="button"
              aria-expanded={isProfileDropdownOpen}
              onClick={() => setIsProfileDropdownOpen((open) => !open)}
            >
              <BsPersonCircle />
              {userId ? "Profile" : "Sign In"}
            </button>

            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                {userId ? (
                  <button type="button" onClick={handleLogoutClick}>
                    Logout
                  </button>
                ) : (
                  <>
                    <button type="button" onClick={handleLoginClick}>
                      Login
                    </button>
                    <button type="button" onClick={handleRegisterClick}>
                      Register
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
