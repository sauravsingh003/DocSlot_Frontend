import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Components
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import About from "./Components/About";
import Services from "./Components/Services";
import Contact from "./Components/Contact";

// Admin Components
import AddSpeciality from "./Admin/AddSpeciality";
import AddDoctor from "./Admin/AddDoctor";
import AddReceptionist from "./Admin/AddReceptionist";
import ViewDoctors from "./Admin/ViewDoctors";
import EditDoctor from "./Admin/EditDoctor";
import EditReceptionist from "./Admin/EditReceptionist";
import Admin from "./Admin/Admin";

// Customer Components
import EditProfile from "./Customer/EditProfile";
import BookAppointment from "./Customer/BookAppointment";
import ViewAppointments from "./Customer/ViewAppointments";

// Receiptionist Components
import ViewReceiptionist from "./Admin/ViewReceiptionist";
import AddPatient from "./Receiptionist/AddPatient";
import ViewPatients from "./Receiptionist/ViewPatients";
import ShowDoctor from "./Components/ShowDoctor";
import Payment from "./Customer/Payment";

// Doctor Components
import Doctor from "./Doctor/Doctor";
import ViewAppointmentsD from "./Doctor/ViewAppointmentsD";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route index element={<AddSpeciality />} />
            <Route path="addSpeciality" element={<AddSpeciality />} />
            <Route path="addDoctor" element={<AddDoctor />} />
            <Route path="addReceptionist" element={<AddReceptionist />} />
            <Route path="viewDoctors" element={<ViewDoctors />} />
            <Route path="viewReceptionist" element={<ViewReceiptionist />} />
            <Route path="editDoctor/:id" element={<EditDoctor />} />
            <Route path="editreceptionist/:id" element={<EditReceptionist />} />
          </Route>

          {/* Receiptionist Routes */}
          <Route path="/receiptionist" element={<AddPatient />} />
          <Route path="/receiptionist/addPatient" element={<AddPatient />} />
          <Route path="/receiptionist/viewPatients" element={<ViewPatients />} />

          {/* Customer Routes */}
          <Route path="/doctors/:id" element={<ShowDoctor />} />
          <Route path="/bookappointment" element={<BookAppointment />} />
          <Route path="/viewappointments" element={<ViewAppointments />} />
          <Route path="/payment/:appointmentId/:amount" element={<Payment />} />
          <Route path="/editprofile/:id" element={<EditProfile />} />

          <Route path="/doctor" element={<ViewAppointmentsD />} />
          <Route path="/doctor/viewAppointments" element={<ViewAppointmentsD />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
