
import React from "react";
import EmployeeItem from "./components/EmployeeItem";

function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <div className="list-container">
      <h2>Employee List</h2>

      {employees.length === 0 ? (
        <p className="empty-message">No employees found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <EmployeeItem
                  key={employee.id}
                  employee={employee}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;