import React from 'react';
import './StudentList.css';

const StudentList = ({ students, fetchStudents, setEditingStudent }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/students/delete/${id}`, {
        method: 'DELETE',
      });
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="student-list-container">
      <h2>📋 Student Records</h2>
      {students.length === 0 ? (
        <p className="no-data">No student records available.</p>
      ) : (
        <div className="student-grid">
          {students.map((student) => (
            <div key={student.id} className="student-card">
              <div className="student-details">
                <h3>{student.name}</h3>
                <p><strong>Department:</strong> {student.department}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>CGPA:</strong> {student.cgpa}</p>
                <p><strong>Phone:</strong> {student.phoneNumber}</p>
                <p><strong>Address:</strong> {student.address}</p>
                <p><strong>Status:</strong> {student.placementStatus}</p>
              </div>
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => setEditingStudent(student)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
