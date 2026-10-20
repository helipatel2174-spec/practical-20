
import React from "react";

function EmployeeForm({
  formData,
  onChange,
  onSubmit,
  isEditing,
  onCancel,
}) {
  return (
    <div className="form-container">
      <h2>{isEditing ? "Update Employee" : "Add Employee"}</h2>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={onChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={onChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={onChange}
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          min="0"
          value={formData.salary}
          onChange={onChange}
          required
        />

        <button type="submit">
          {isEditing ? "Update Employee" : "Add Employee"}
        </button>

        {isEditing && (
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default EmployeeForm;