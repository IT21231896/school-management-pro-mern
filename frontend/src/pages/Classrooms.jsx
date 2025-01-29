import React, { useState } from 'react';
import '../styles/Management.css';

const Classrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    capacity: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update classroom
      setClassrooms(
        classrooms.map((classroom) =>
          classroom.id === formData.id ? formData : classroom
        )
      );
      setIsEditing(false);
    } else {
      // Add new classroom
      setClassrooms([...classrooms, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: '', name: '', capacity: '' });
  };

  const handleEdit = (classroom) => {
    setFormData(classroom);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setClassrooms(classrooms.filter((classroom) => classroom.id !== id));
  };

  return (
    <div className="management-container">
      <h2>Classrooms Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Classroom Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Update Classroom' : 'Add Classroom'}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom.id}>
              <td>{classroom.name}</td>
              <td>{classroom.capacity}</td>
              <td>
                <button onClick={() => handleEdit(classroom)}>Edit</button>
                <button onClick={() => handleDelete(classroom.id)}>
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

export default Classrooms;