import React from "react";

export const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled = false,
  maxLength,
  pattern,
  inputMode,
  icon,
  helpText,
}) => {
  const hasError = touched && error;

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label fw-semibold">
          {label}
        </label>
      )}
      <div className="input-group">
        {icon && (
          <span className="input-group-text bg-light">
            {icon}
          </span>
        )}
        <input
          id={name}
          type={type}
          name={name}
          className={`form-control ${
            hasError ? "is-invalid border-danger" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          maxLength={maxLength}
          pattern={pattern}
          inputMode={inputMode}
          style={{
            borderColor: hasError ? "#dc3545" : undefined,
          }}
        />
      </div>
      {hasError && (
        <div className="invalid-feedback d-block" style={{ color: "#dc3545" }}>
          {error}
        </div>
      )}
      {helpText && !hasError && (
        <small className="form-text text-muted d-block mt-1">
          {helpText}
        </small>
      )}
    </div>
  );
};

export default FormField;
