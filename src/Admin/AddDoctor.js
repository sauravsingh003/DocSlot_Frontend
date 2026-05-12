import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "../config/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormField from "../Components/FormField";
import { addDoctorValidationSchema } from "../utils/validationSchemas";
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaMoneyBillWave } from "react-icons/fa6";
import "./AddDoctor.css";

function AddDoctor() {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");

    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (role === "ROLE_DOCTOR") {
      navigate("/doctor");
    } else if (role === "ROLE_PATIENT") {
      navigate("/");
    } else if (role === "ROLE_RECEPTIONIST") {
      navigate("/receiptionist");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get("/admin/getAllSpecialization");
        setSpecializations(response.data);
      } catch (error) {
        console.error("Error fetching specializations:", error);
        toast.error("Failed to load specializations");
      }
    };

    fetchSpecializations();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      specialization: "",
      fee: "",
      degree: "",
      password: "",
    },
    validationSchema: addDoctorValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const doctorData = {
          name: values.name.trim(),
          email: values.email.trim(),
          degree: values.degree.trim(),
          phone: values.phone.trim(),
          specializationId: values.specialization,
          password: values.password,
          amount: parseFloat(values.fee),
        };

        const response = await axios.post("/admin/addDoctor", doctorData);

        if (response.status === 201 || response.status === 200) {
          toast.success("Doctor added successfully!");
          formik.resetForm();
          setTimeout(() => navigate("/admin/viewDoctors"), 1500);
        }
      } catch (error) {
        console.error("Error adding doctor:", error);
        toast.error(error.response?.data?.message || "Failed to add doctor. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="add-doctor-container">
      <ToastContainer />
      <h3 className="mb-4">Add New Doctor</h3>

      <form onSubmit={formik.handleSubmit} className="doctor-form">
        {/* Doctor Name */}
        <FormField
          label="Doctor Name"
          name="name"
          type="text"
          placeholder="Enter doctor's full name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name}
          touched={formik.touched.name}
          icon={<FaUser />}
        />

        {/* Email */}
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter doctor's email"
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

        {/* Degree */}
        <FormField
          label="Medical Degree"
          name="degree"
          type="text"
          placeholder="Enter degree (e.g., MBBS, MD)"
          value={formik.values.degree}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.degree}
          touched={formik.touched.degree}
          icon={<FaGraduationCap />}
        />

        {/* Specialization */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Specialization</label>
          <select
            name="specialization"
            {...formik.getFieldProps("specialization")}
            className={`form-control ${
              formik.touched.specialization && formik.errors.specialization
                ? "is-invalid border-danger"
                : ""
            }`}
            style={{
              borderColor:
                formik.touched.specialization && formik.errors.specialization
                  ? "#dc3545"
                  : undefined,
            }}
          >
            <option value="">-- Select Specialization --</option>
            {specializations.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
          {formik.touched.specialization && formik.errors.specialization && (
            <div className="invalid-feedback d-block" style={{ color: "#dc3545" }}>
              {formik.errors.specialization}
            </div>
          )}
        </div>

        {/* Consultation Fee */}
        <FormField
          label="Consultation Fee"
          name="fee"
          type="number"
          placeholder="Enter fee amount"
          value={formik.values.fee}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.fee}
          touched={formik.touched.fee}
          icon={<FaMoneyBillWave />}
          step="0.01"
          inputMode="decimal"
        />

        {/* Password */}
        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="Min 8 chars: uppercase, lowercase, number, special"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
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
                Adding Doctor...
              </>
            ) : (
              "Add Doctor"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDoctor;