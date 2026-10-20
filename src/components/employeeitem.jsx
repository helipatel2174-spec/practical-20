
import React from "react";

function EmployeeItem({ employee, onEdit, onDelete }) {
  return (
    <tr>
      <td>{employee.id}</td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.department}</td>
      <td>₹{employee.salary}</td>
      <td>
        <button className="edit-btn" onClick={() => onEdit(employee)}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(employee.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default EmployeeItem;