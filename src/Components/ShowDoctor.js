import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ShowDoctor.css";
import CustomerNavbar from "./CustomerNavbar";
import { FaCalendarCheck, FaIndianRupeeSign, FaPhone, FaUserDoctor } from "react-icons/fa6";

const stripDoctorImages = (doctorList) =>
  doctorList.map(({ doctorImageBase64, ...doctor }) => doctor);

const collectDoctorImages = (doctorList) =>
  doctorList.reduce((images, doctor) => {
    if (doctor.id && doctor.doctorImageBase64) {
      images[doctor.id] = doctor.doctorImageBase64;
    }

    return images;
  }, {});

const runWhenBrowserIsIdle = (callback) => {
  if ("requestIdleCallback" in window) {
    return window.requestIdleCallback(callback, { timeout: 1200 });
  }

  return window.setTimeout(callback, 150);
};

const cancelIdleWork = (handle) => {
  if (!handle) return;

  if ("cancelIdleCallback" in window) {
    window.cancelIdleCallback(handle);
    return;
  }

  window.clearTimeout(handle);
};


const getDoctorsFromResponse = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.doctors)) return payload.doctors;
  if (Array.isArray(payload?.content)) return payload.content;
  return [];
};

const getDoctorImageSource = (base64Image) => {
  if (!base64Image) return null;
  if (base64Image.startsWith("data:image")) return base64Image;

  const mimeType = base64Image.startsWith("/9j/") ? "jpeg" : "png";
  return `data:image/${mimeType};base64,${base64Image}`;
};

function ShowDoctor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [doctorImages, setDoctorImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    let imageWorkHandle;

    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);
      setDoctors([]);
      setDoctorImages({});
      const startedAt = performance.now();

      try {
        const endpoint = id ? `/patient/getDoctorsBySpecialization/${id}` : `/patient/getAllDoctors`;
        const config = id ? { signal: controller.signal } : { signal: controller.signal, headers: { Authorization: undefined } };
        const response = await axios.get(endpoint, config);

        const doctorList = getDoctorsFromResponse(response.data);

        if (isMounted) {
          setDoctors(stripDoctorImages(doctorList));
          setLoading(false);

          imageWorkHandle = runWhenBrowserIsIdle(() => {
            if (isMounted) {
              setDoctorImages(collectDoctorImages(doctorList));
            }
          });

          console.info(
            `Loaded ${doctorList.length} doctors${id ? ` for specialization ${id}` : ''} in ${Math.round(
              performance.now() - startedAt
            )}ms`
          );
        }
      } catch (err) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
          return;
        }

        if (isMounted) {
          setDoctors([]);
          setError("Failed to load doctors. Please try again later.");
          setLoading(false);
        }
      }
    };

    fetchDoctors();

    return () => {
      isMounted = false;
      cancelIdleWork(imageWorkHandle);
      controller.abort();
    };
  }, [id]);

  const handleAppointmentBooking = (doctor) => {
    const userId = sessionStorage.getItem("userId");
    const selectedDoctor = {
      ...doctor,
      doctorImageBase64: doctorImages[doctor.id],
    };

    if (!userId) {
      toast.warn("Please login to book an appointment.", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    navigate("/bookappointment", { state: selectedDoctor });
  };

  const specializationName = id ? (doctors[0]?.specializationName || "Selected Specialization") : "All Doctors";

  return (
    <div className="doctor-page">
      <CustomerNavbar />
      <ToastContainer />

      <main className="doctor-results">
        <section className="doctor-results-hero">
          <div className="container">
            <span>Available doctors</span>
            <h1>{loading ? "Finding the best doctors for you" : specializationName}</h1>
            <p>
              Compare verified doctors, consultation fees, and booking details
              before confirming your appointment.
            </p>
          </div>
        </section>

        <section className="container doctor-results-content">
          {loading && (
            <div className="doctor-grid" aria-label="Loading doctors">
              {[...Array(4)].map((_, index) => (
                <article className="doctor-card doctor-card-skeleton" key={index}>
                  <div className="skeleton skeleton-image"></div>
                  <div className="skeleton skeleton-line skeleton-line-lg"></div>
                  <div className="skeleton skeleton-line"></div>
                  <div className="skeleton skeleton-line"></div>
                  <div className="skeleton skeleton-button"></div>
                </article>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="doctor-state-card">
              <FaUserDoctor />
              <h2>Unable to load doctors</h2>
              <p>{error}</p>
              <button type="button" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && doctors.length === 0 && (
            <div className="doctor-state-card">
              <FaUserDoctor />
              <h2>No doctors found</h2>
              <p>No doctors are available for this specialization right now.</p>
            </div>
          )}

          {!loading && !error && doctors.length > 0 && (
            <div className="doctor-grid">
              {doctors.map((doctor) => {
                const imageSource = getDoctorImageSource(doctorImages[doctor.id]);

                return (
                  <article className="doctor-card" key={doctor.id}>
                    <div className="doctor-image-wrap">
                      {imageSource ? (
                        <img
                          src={imageSource}
                          alt={doctor.name}
                          className="doctor-image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="doctor-image-placeholder">
                          <FaUserDoctor />
                        </div>
                      )}
                    </div>

                    <div className="doctor-details">
                      <span className="doctor-specialization-pill">
                        {doctor.specializationName || "Doctor"}
                      </span>
                      <h2 className="doctor-name">{doctor.name}</h2>
                      <p className="doctor-degree">{doctor.degree}</p>

                      <div className="doctor-meta">
                        <span>
                          <FaPhone />
                          {doctor.phone}
                        </span>
                        <span>
                          <FaIndianRupeeSign />
                          {doctor.amount}
                        </span>
                      </div>
                    </div>

                    <button
                      className="book-appointment-button"
                      onClick={() => handleAppointmentBooking(doctor)}
                      type="button"
                    >
                      <FaCalendarCheck />
                      Book Appointment
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ShowDoctor;
