import * as Yup from "yup";

// Custom validation messages
const VALIDATION_MESSAGES = {
  NAME_INVALID: "Name must contain only letters and spaces",
  NAME_MIN: "Name must be at least 3 characters",
  NAME_MAX: "Name cannot exceed 50 characters",
  EMAIL_INVALID: "Enter a valid email address",
  PHONE_INVALID: "Phone number must be exactly 10 digits",
  PHONE_NUMERIC: "Phone number must contain only digits",
  PASSWORD_MIN: "Password must be at least 8 characters",
  PASSWORD_STRONG: "Password must contain uppercase, lowercase, number and special character",
  PASSWORD_MATCH: "Passwords must match",
  AGE_INVALID: "Age must be between 1 and 120",
  AGE_NUMERIC: "Age must be a number",
  AMOUNT_INVALID: "Amount must be a positive number",
  AMOUNT_NUMERIC: "Amount must be numeric",
  REQUIRED: "This field is required",
  SPACES_ONLY: "This field cannot contain only spaces",
};

// Name validation
const nameValidation = Yup.string()
  .required(VALIDATION_MESSAGES.REQUIRED)
  .test("spaces-only", VALIDATION_MESSAGES.SPACES_ONLY, (value) => {
    return value ? value.trim().length > 0 : false;
  })
  .matches(/^[a-zA-Z\s]*$/, VALIDATION_MESSAGES.NAME_INVALID)
  .min(3, VALIDATION_MESSAGES.NAME_MIN)
  .max(50, VALIDATION_MESSAGES.NAME_MAX)
  .trim();

// Email validation
const emailValidation = Yup.string()
  .required(VALIDATION_MESSAGES.REQUIRED)
  .email(VALIDATION_MESSAGES.EMAIL_INVALID)
  .test("email-format", VALIDATION_MESSAGES.EMAIL_INVALID, (value) => {
    if (!value) return false;
    // More strict email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  });

// Phone validation
const phoneValidation = Yup.string()
  .required(VALIDATION_MESSAGES.REQUIRED)
  .matches(/^[0-9]*$/, VALIDATION_MESSAGES.PHONE_NUMERIC)
  .test("phone-length", VALIDATION_MESSAGES.PHONE_INVALID, (value) => {
    return value ? value.length === 10 : false;
  });

// Password validation - strong password
const passwordValidation = Yup.string()
  .required(VALIDATION_MESSAGES.REQUIRED)
  .min(8, VALIDATION_MESSAGES.PASSWORD_MIN)
  .test("password-strong", VALIDATION_MESSAGES.PASSWORD_STRONG, (value) => {
    if (!value) return false;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  });

// Confirm password validation
const confirmPasswordValidation = Yup.string()
  .required(VALIDATION_MESSAGES.REQUIRED)
  .oneOf([Yup.ref("password"), null], VALIDATION_MESSAGES.PASSWORD_MATCH);

// Age validation
const ageValidation = Yup.number()
  .required(VALIDATION_MESSAGES.REQUIRED)
  .typeError(VALIDATION_MESSAGES.AGE_NUMERIC)
  .min(1, VALIDATION_MESSAGES.AGE_INVALID)
  .max(120, VALIDATION_MESSAGES.AGE_INVALID);

// Amount/Fee validation
const amountValidation = Yup.number()
  .required(VALIDATION_MESSAGES.REQUIRED)
  .typeError(VALIDATION_MESSAGES.AMOUNT_NUMERIC)
  .positive(VALIDATION_MESSAGES.AMOUNT_INVALID)
  .test("decimal", VALIDATION_MESSAGES.AMOUNT_INVALID, (value) => {
    return value !== undefined && value > 0;
  });

// Schemas for different forms

// Login Schema
export const loginValidationSchema = Yup.object().shape({
  email: emailValidation,
  password: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
});

// Register Schema
export const registerValidationSchema = Yup.object().shape({
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation,
});

// Add Doctor Schema
export const addDoctorValidationSchema = Yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  age: ageValidation,
  fee: amountValidation,
  specialization: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
});

// Edit Doctor Schema
export const editDoctorValidationSchema = Yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  age: ageValidation,
  fee: amountValidation,
  specialization: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
});

// Add Receptionist Schema
export const addReceptionistValidationSchema = Yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  age: ageValidation,
});

// Edit Receptionist Schema
export const editReceptionistValidationSchema = Yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  age: ageValidation,
});

// Edit Profile Schema
export const editProfileValidationSchema = Yup.object().shape({
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
});

// Book Appointment Schema
export const bookAppointmentValidationSchema = Yup.object().shape({
  diseaseDescription: Yup.string()
    .required(VALIDATION_MESSAGES.REQUIRED)
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters")
    .test("spaces-only", VALIDATION_MESSAGES.SPACES_ONLY, (value) => {
      return value ? value.trim().length > 0 : false;
    }),
  appointmentDate: Yup.date()
    .required(VALIDATION_MESSAGES.REQUIRED)
    .min(new Date(), "Appointment date cannot be in the past"),
});

// Add Speciality Schema
export const addSpecialityValidationSchema = Yup.object().shape({
  specialityName: Yup.string()
    .required(VALIDATION_MESSAGES.REQUIRED)
    .min(3, "Speciality name must be at least 3 characters")
    .max(50, "Speciality name cannot exceed 50 characters")
    .test("spaces-only", VALIDATION_MESSAGES.SPACES_ONLY, (value) => {
      return value ? value.trim().length > 0 : false;
    }),
});

// Add Patient Schema (Receptionist)
export const addPatientValidationSchema = Yup.object().shape({
  name: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  age: ageValidation,
});

export const VALIDATION_MESSAGES_EXPORT = VALIDATION_MESSAGES;
