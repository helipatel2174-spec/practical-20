
import React, { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  // READ
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setEmployees(
          data.slice(0, 5).map((emp) => ({
            id: emp.id,
            name: emp.name,
            email: emp.email,
            phone: emp.phone,
            company: emp.company.name,
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE AND UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId !== null) {
        const response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Update failed");

        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === editingId
              ? { ...formData, id: editingId }
              : emp
          )
        );

        alert("Employee Updated Successfully");
        setEditingId(null);
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Add failed");

        const data = await response.json();

        setEmployees((prev) => [
          ...prev,
          { ...formData, id: data.id || Date.now() },
        ]);

        alert("Employee Added Successfully");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
      });
    } catch (error) {
      console.error(error);
      alert("Operation failed. Check your internet connection.");
    }
  };

  // EDIT
  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      company: employee.company,
    });

    setEditingId(employee.id);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      setEmployees((prev) =>
        prev.filter((emp) => emp.id !== id)
      );

      alert("Employee Deleted Successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Employee Management System</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Employee Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId !== null ? "Update Employee" : "Add Employee"}
        </button>

        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Employee List</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.company}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "30px auto",
    padding: "20px",
    fontFamily: "Arial",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    marginBottom: "25px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
};

export default App;