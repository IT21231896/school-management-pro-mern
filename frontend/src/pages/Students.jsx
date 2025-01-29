import React, { useState } from 'react';
import '../styles/Management.css';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    grade: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update student
      setStudents(
        students.map((student) =>
          student.id === formData.id ? formData : student
        )
      );
      setIsEditing(false);
    } else {
      // Add new student
      setStudents([...students, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: '', name: '', grade: '' });
  };

  const handleEdit = (student) => {
    setFormData(student);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="management-container">
      <h2>Students Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Update Student' : 'Add Student'}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.grade}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;