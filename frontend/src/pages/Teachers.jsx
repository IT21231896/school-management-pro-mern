import React, { useState } from 'react';
import '../styles/Management.css';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    subject: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update teacher
      setTeachers(
        teachers.map((teacher) =>
          teacher.id === formData.id ? formData : teacher
        )
      );
      setIsEditing(false);
    } else {
      // Add new teacher
      setTeachers([...teachers, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: '', name: '', subject: '' });
  };

  const handleEdit = (teacher) => {
    setFormData(teacher);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  return (
    <div className="management-container">
      <h2>Teachers Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Teacher Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Update Teacher' : 'Add Teacher'}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.name}</td>
              <td>{teacher.subject}</td>
              <td>
                <button onClick={() => handleEdit(teacher)}>Edit</button>
                <button onClick={() => handleDelete(teacher.id)}>
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

export default Teachers;