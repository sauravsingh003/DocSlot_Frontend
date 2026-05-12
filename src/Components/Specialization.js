import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/api";
import "./Specialization.css";

const fallbackSpecialities = [
  { id: 1, name: "Cardiologist", imageUrl: "/assests/Cardiologist.png" },
  { id: 2, name: "Dentist", imageUrl: "/assests/Dentist.png" },
  { id: 3, name: "Neurologist", imageUrl: "/assests/Neurologist.png" },
  { id: 4, name: "Pediatrician", imageUrl: "/assests/Pediatrician.png" },
  { id: 5, name: "Ophthalmologist", imageUrl: "/assests/Ophthalmologist.png" },
  { id: 6, name: "Psychiatrist", imageUrl: "/assests/Psychiatrist.png" },
];

function Specialization() {
  const [specialities, setSpecialities] = useState(fallbackSpecialities);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get("/admin/getAllSpecialization", config)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSpecialities(response.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSpecialitiesClick = (id) => {
    navigate(`/doctors/${id}`);
  };

  return (
    <div className="category-container">
      {specialities.map((speciality) => {
        const imageSource = speciality.specializationImage
          ? `data:image/png;base64,${speciality.specializationImage}`
          : speciality.imageUrl;

        return (
          <button
            className="category-card"
            key={`${speciality.id}-${speciality.name}`}
            onClick={() => handleSpecialitiesClick(speciality.id)}
            type="button"
          >
            <div className="category-media">
              {imageSource ? (
                <img
                  src={imageSource}
                  alt={speciality.name}
                  className="category-img"
                  loading="lazy"
                />
              ) : (
                <div className="category-img category-img-placeholder">
                  {speciality.name?.charAt(0)?.toUpperCase() || "D"}
                </div>
              )}
            </div>
            <span className="category-name">{speciality.name}</span>
            <span className="category-meta">
              {loading ? "Checking availability" : "View doctors"}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default Specialization;
