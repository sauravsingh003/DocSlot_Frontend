import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../config/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "./CustomerNavbar";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      weight: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      age: Yup.number().positive("Must be positive").integer("Must be a number").required("Age is required"),
      gender: Yup.string().oneOf(["Male", "Female", "Other"]).required("Gender is required"),
      weight: Yup.number().positive("Must be positive").required("Weight is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post("/patient/registerPatient", values);
        toast.success("Registration successful!", { position: "top-right", autoClose: 1500 });
        navigate("/login");
      } catch (error) {
        toast.error("Registration failed. Please try again.", { position: "top-right", autoClose: 1500 });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <CustomerNavbar />
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card p-4 shadow-lg"
          style={{
            maxWidth: "500px",
            width: "100%",
            borderRadius: "1rem",
            backgroundColor: "#ffffff",
            border: "1px solid #dee2e6",
          }}
        >
          <h3 className="text-center text-primary fw-bold mb-4">Register</h3>
          <form onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
                placeholder="Your full name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="invalid-feedback d-block">{formik.errors.name}</div>
              )}
            </div>

            {/* Age */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Age</label>
              <input
                type="number"
                {...formik.getFieldProps("age")}
                className={`form-control ${formik.touched.age && formik.errors.age ? "is-invalid" : ""}`}
                placeholder="Your age"
              />
              {formik.touched.age && formik.errors.age && (
                <div className="invalid-feedback d-block">{formik.errors.age}</div>
              )}
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Gender</label>
              <select
                {...formik.getFieldProps("gender")}
                className={`form-control ${formik.touched.gender && formik.errors.gender ? "is-invalid" : ""}`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="invalid-feedback d-block">{formik.errors.gender}</div>
              )}
            </div>

            {/* Weight */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Weight (kg)</label>
              <input
                type="number"
                {...formik.getFieldProps("weight")}
                className={`form-control ${formik.touched.weight && formik.errors.weight ? "is-invalid" : ""}`}
                placeholder="Your weight in kg"
              />
              {formik.touched.weight && formik.errors.weight && (
                <div className="invalid-feedback d-block">{formik.errors.weight}</div>
              )}
            </div>

            {/* Email with icon */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="fas fa-envelope"></i>
                </span>
                <input
                  type="email"
                  {...formik.getFieldProps("email")}
                  className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter your email"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback d-block">{formik.errors.email}</div>
              )}
            </div>

            {/* Password with eye icon */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                  placeholder="Create a password"
                />
                <span className="input-group-text bg-light" onClick={togglePassword} style={{ cursor: "pointer" }}>
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback d-block">{formik.errors.password}</div>
              )}
            </div>

            {/* Submit */}
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          {/* Login link */}
          <div className="text-center mt-4">
            <p className="mb-0">Already have an account?</p>
            <Link to="/login" className="text-decoration-none text-primary fw-semibold">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
