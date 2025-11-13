import React, { useState, useEffect } from 'react';
import './StudentForm.css';

const StudentForm = ({ fetchStudents, editingStudent, setEditingStudent }) => {
  const [student, setStudent] = useState({
    id: '',
    name: '',
    department: '',
    email: '',
    cgpa: '',
    phoneNumber: '',
    address: '',
    placementStatus: ''
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    } else {
      setStudent({
        id: '',
        name: '',
        department: '',
        email: '',
        cgpa: '',
        phoneNumber: '',
        address: '',
        placementStatus: ''
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await fetch(`http://localhost:8080/students/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student)
        });
      } else {
        await fetch('http://localhost:8080/students/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student)
        });
      }

      fetchStudents();
      setEditingStudent(null);
      setStudent({
        id: '',
        name: '',
        department: '',
        email: '',
        cgpa: '',
        phoneNumber: '',
        address: '',
        placementStatus: ''
      });
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={student.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={student.department}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cgpa"
          placeholder="CGPA"
          value={student.cgpa}
          onChange={handleChange}
          step="0.01"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={student.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={student.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="placementStatus"
          placeholder="Placement Status (Placed/Not Placed)"
          value={student.placementStatus}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingStudent ? 'Update Student' : 'Add Student'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
