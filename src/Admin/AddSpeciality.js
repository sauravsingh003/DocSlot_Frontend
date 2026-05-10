import React, { useEffect, useState } from "react";
import api from "../config/api";
import "./AddSpeciality.css";
import { useNavigate } from "react-router-dom";

function AddSpeciality() {
  const [specialityName, setSpecialityName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
    useEffect(() => {
      if (!sessionStorage.getItem("userName")) {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "DOCTOR") {
        navigate("/doctor");
      } else if (sessionStorage.getItem("userRole") === "PATIENT") {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "RECEPTIONIST") {
        navigate("/receiptionist");
      }
    }, [navigate]);

  const handleNameChange = (e) => {
    setSpecialityName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!specialityName.trim()) {
      setError("Speciality name is required.");
      return;
    }

    try {
      const response = await api.post("/admin/addSpecialization", {
        name: specialityName.trim(),
      });
    
      if (response.status === 201) {
        alert("Speciality added successfully!");
        setSpecialityName("");
        setError("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to add Speciality. Please try again.");
    }
  }

  return (
    <>
      <div className="add-category-container">
        <h3>Add New Speciality</h3>
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label htmlFor="categoryName">Speciality Name</label>
            <input
              type="text"
              id="categoryName"
              value={specialityName}
              onChange={handleNameChange}
              placeholder="Enter speciality"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddSpeciality;
