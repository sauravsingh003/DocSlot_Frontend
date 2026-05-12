import React, { useState, useEffect } from "react";
import axios from "../config/api";
import { useNavigate } from "react-router-dom";
import "./ViewDoctors.css";

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userName = sessionStorage.getItem("userName");
    const userRole = sessionStorage.getItem("userRole");
    
    if (!userName) {
      navigate("/");
    } else if (userRole && userRole.includes("ROLE_DOCTOR")) {
      navigate("/doctor");
    } else if (userRole && userRole.includes("ROLE_PATIENT")) {
      navigate("/");
    } else if (userRole && userRole.includes("ROLE_RECEPTIONIST")) {
      navigate("/receiptionist");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get("/admin/getAllDoctors", config);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleEdit = (id) => {
    if (id) {
      navigate(`/admin/editDoctor/${id}`);
    } else {
      console.error("Doctor ID is undefined");
    }
  };

  return (
    <>
      <div className="view-doctors-container">
        <h3>View Doctors</h3>
        <div className="table-responsive">
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Degree</th>
                <th>Amount</th>
                <th>Specialization</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <tr key={doctor.email}>
                    <td>{doctor.name}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.degree}</td>
                    <td>{doctor.amount}</td>
                    <td>{doctor.specializationName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No doctors available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ViewDoctors;
