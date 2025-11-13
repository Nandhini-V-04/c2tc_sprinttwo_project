import React, { useState, useEffect } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const App = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch all students on component load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/students/all');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div className="App">
      <h1>🎓 Student Placement Management</h1>

      <StudentForm
        fetchStudents={fetchStudents}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />

      <StudentList
        students={students}
        fetchStudents={fetchStudents}
        setEditingStudent={setEditingStudent}
      />
    </div>
  );
};

export default App;
