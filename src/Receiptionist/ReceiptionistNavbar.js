import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles.css";

function ReceiptionistNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <>
      <Navbar variant="dark" expand="lg" className="custom-navbar px-4">
        <Container fluid>
          <Navbar.Brand
            as={NavLink}
            to="/receiptionist"
            className="d-flex align-items-center text-white"
          >
            <span className="logo-style" style={{ color: "white" }}>DOCSLOT</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="recep-nav" />
          <Navbar.Collapse id="recep-nav">
            <Nav className="ms-auto align-items-center gap-3">
              <Badge bg="light" className="admin-badge">
                <FaUserCircle />
                {sessionStorage.getItem("userName")}
              </Badge>
              <Button variant="danger" className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </>
  );
}

export default ReceiptionistNavbar;