import React from "react"


const FormInput = ({ name, type, placeholder, handleChange, labelText }) => (
  <div className="auth__form-container_fields-content_input">
    <label htmlFor={name}>{labelText}</label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      required
    />
  </div>
)

export default FormInput
