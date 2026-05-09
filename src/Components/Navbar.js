import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import { BsCartFill } from "react-icons/bs";

function Navbar({ cartCount }) { // Accept cartCount as prop
  const userId = 1; // Mocked user ID

  return (
    <nav
      className="navbar navbar-expand-lg px-3"
      style={{ minHeight: "10vh", backgroundColor: "green" }}
    >
      <div className="container-fluid">
        {/* Brand Logo */}
        <NavLink
          className="navbar-brand text-white d-flex align-items-center"
          to="/"
        >
          <span className="logo-style">GROCIFY</span>
        </NavLink>

        {/* Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link fs-4 fw-semibold" to="/about">
                <button
                  type="button"
                  className="btn btn-white"
                  style={{
                    color: "#aeff00",
                    fontWeight: "bold",
                    border: "2px solid #aeff00",
                  }}
                >
                  About
                </button>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link fs-4 fw-semibold" to="/login">
                <button
                  type="button"
                  className="btn btn-white"
                  style={{
                    color: "#aeff00",
                    fontWeight: "bold",
                    border: "2px solid #aeff00",
                  }}
                >
                  Login
                </button>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link fs-4 fw-semibold" to="/register">
                <button
                  type="button"
                  className="btn btn-white"
                  style={{
                    color: "#aeff00",
                    fontWeight: "bold",
                    border: "2px solid #aeff00",
                  }}
                >
                  Register
                </button>
              </NavLink>
            </li>

            {/* Cart Icon with Dynamic Count */}
            <li className="nav-item">
              <NavLink
                className="nav-link fs-4 fw-semibold"
                to={`/viewcart/${userId}`}
              >
                <button
                  type="button"
                  className="btn btn-white position-relative"
                  style={{ color: "#aeff00", fontWeight: "bold" }}
                >
                  <BsCartFill size={20} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
