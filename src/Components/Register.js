import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "../config/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "./CustomerNavbar";
import FormField from "./FormField";
import { registerValidationSchema } from "../utils/validationSchemas";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa6";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = {
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          phone: values.phone,
          password: values.password,
        };
        const response = await axios.post("/patient/registerPatient", payload);
        toast.success("Registration successful!", { position: "top-right", autoClose: 1500 });
        navigate("/login");
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed. Please try again.", { position: "top-right", autoClose: 1500 });
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
            {/* First Name */}
            <FormField
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
              icon={<FaUser />}
            />

            {/* Last Name */}
            <FormField
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
              icon={<FaUser />}
            />

            {/* Email */}
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
              touched={formik.touched.email}
              icon={<FaEnvelope />}
            />

            {/* Phone */}
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="10-digit phone number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.phone}
              touched={formik.touched.phone}
              icon={<FaPhone />}
              maxLength="10"
              inputMode="numeric"
            />

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaLock />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className={`form-control ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid border-danger"
                      : ""
                  }`}
                  placeholder="Min 8 chars, uppercase, lowercase, number, special char"
                  style={{
                    borderColor:
                      formik.touched.password && formik.errors.password
                        ? "#dc3545"
                        : undefined,
                  }}
                />
                <span
                  className="input-group-text bg-light"
                  onClick={togglePassword}
                  style={{ cursor: "pointer" }}
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback d-block" style={{ color: "#dc3545" }}>
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.confirmPassword}
              touched={formik.touched.confirmPassword}
              icon={<FaLock />}
            />

            {/* Submit Button */}
            <div className="d-grid mt-4">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg" 
                disabled={loading || !formik.isValid || !formik.dirty}
              >
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
