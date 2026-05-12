import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "../config/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "./CustomerNavbar";
import FormField from "./FormField";
import { loginValidationSchema } from "../utils/validationSchemas";
import { FaEnvelope, FaLock } from "react-icons/fa6";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async (values) => {
      setLoading(true);

      try {
        const response = await axios.post(
          "/login",
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const user = response.data;

        // Save JWT token
        sessionStorage.setItem("jwtToken", user.jwt);

        // Decode JWT payload
        const payload = JSON.parse(
          atob(user.jwt.split(".")[1])
        );

        console.log("JWT Payload:", payload);

        // Save user email
        sessionStorage.setItem(
          "userEmail",
          payload.sub
        );

        // Save userName
        sessionStorage.setItem(
          "userName",
          payload.sub
        );

        // Extract role safely - handle both array and string formats
        let role = "";
        if (Array.isArray(payload.authorities)) {
          // If authorities is an array of objects like [{authority: "ROLE_ADMIN"}]
          role = payload.authorities[0]?.authority || "";
        } else if (typeof payload.authorities === "string") {
          role = payload.authorities;
        } else if (payload.role) {
          role = payload.role;
        } else if (payload.roles) {
          role = payload.roles;
        }

        console.log("Extracted Role:", role);
        console.log("Role Type:", typeof role);

        // Save role
        sessionStorage.setItem(
          "userRole",
          role
        );

        // Save actual numeric user ID
        sessionStorage.setItem(
          "userId",
        payload.id
        );

        // Success toast
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 1500,
        });

        // Redirect based on role
        console.log("Redirecting based on role:", role);

        if (role && role.includes("ROLE_ADMIN")) {
          navigate("/admin");
        }
        else if (role && role.includes("ROLE_DOCTOR")) {
          navigate("/doctor");
        }
        else if (role && role.includes("ROLE_RECEPTIONIST")) {
          navigate("/receiptionist");
        }
        else {
          navigate("/");
        }

      } catch (error) {

        console.error("Login Error:", error);
        console.error("Error Response:", error.response);
        console.error("Error Status:", error.response?.status);
        console.error("Error Message:", error.message);

        let errorMessage = "Invalid email or password!";
        
        if (error.response?.status === 401) {
          errorMessage = "Invalid email or password!";
        } else if (error.response?.status === 400) {
          errorMessage = error.response.data?.message || "Bad request. Please check your input.";
        } else if (error.code === "ECONNABORTED") {
          errorMessage = "Request timeout. Please try again.";
        } else if (error.message === "Network Error") {
          errorMessage = "Network error. Please check your connection.";
        }

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 1500,
        });

      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      style={{
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      <CustomerNavbar />

      <ToastContainer />

      <div className="d-flex justify-content-center align-items-center min-vh-100">

        <div
          className="card p-4 shadow-lg"
          style={{
            maxWidth: "420px",
            width: "100%",
            borderRadius: "1rem",
            backgroundColor: "#ffffff",
            border: "1px solid #dee2e6",
          }}
        >

          <h3 className="text-center text-primary fw-bold mb-4">
            Login
          </h3>

          <form onSubmit={formik.handleSubmit}>

            {/* Email Field */}
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

            {/* Password Field */}
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
                  placeholder="Enter your password"
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
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback d-block" style={{ color: "#dc3545" }}>
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="d-grid mt-4">

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading || !formik.isValid || !formik.values.email || !formik.values.password}
              >

                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>

                    Logging in...
                  </>
                ) : (
                  "Login"
                )}

              </button>

            </div>

          </form>

          {/* Register Link */}
          <div className="text-center mt-4">

            <p className="mb-0">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="text-decoration-none text-primary fw-semibold"
            >
              Register here
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;