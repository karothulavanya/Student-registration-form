import React, { useState } from "react";
import StudentInfo from "./StudentInfo";
import Address from "./Address";
import ContactInfo from "./ContactInfo";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: null,
    studentId: "",
    gender: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
  });

  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      dob: date,
    }));
  };

  const handleCreate = () => {
    if (editingIndex === null) {
      setStudents((prev) => [...prev, formData]);
    } else {
      handleUpdate();
    }
    setFormData({
      firstName: "",
      lastName: "",
      dob: null,
      studentId: "",
      gender: "",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      email: "",
    });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(students[index]);
    setEditingIndex(index);
  };

  const handleUpdate = () => {
    const updatedStudents = students.map((student, index) =>
      index === editingIndex ? formData : student
    );
    setStudents(updatedStudents);
  };

  const handleDelete = (index) => {
    const filteredStudents = students.filter((_, i) => i !== index);
    setStudents(filteredStudents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate();
  };

  return (
    <div className="container">
      <div className="row ">
        <div className="col-12 col-md-8 col-lg-4">
          <div className="card p-4 shadow-lg">
            <h2 className="text-center mb-4">Student Registration Form</h2>
            <form onSubmit={handleSubmit}>
              <StudentInfo
                formData={formData}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
              />
              <Address formData={formData} handleChange={handleChange} />
              <ContactInfo formData={formData} handleChange={handleChange} />
              <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-light btn-block btn-lg"
              >
                {editingIndex === null ? "Submit" : "Update"}
              </button>
              </div>
            </form>
            </div>
            
          
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h3>Students List</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S.no</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.dob ? student.dob.format("DD/MM/YYYY") : ""}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
