import React, { useState } from 'react';
import '../styles/Management.css';

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update facility
      setFacilities(
        facilities.map((facility) =>
          facility.id === formData.id ? formData : facility
        )
      );
      setIsEditing(false);
    } else {
      // Add new facility
      setFacilities([...facilities, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: '', name: '', description: '' });
  };

  const handleEdit = (facility) => {
    setFormData(facility);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setFacilities(facilities.filter((facility) => facility.id !== id));
  };

  return (
    <div className="management-container">
      <h2>Facilities Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Facility Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Update Facility' : 'Add Facility'}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facilities.map((facility) => (
            <tr key={facility.id}>
              <td>{facility.name}</td>
              <td>{facility.description}</td>
              <td>
                <button onClick={() => handleEdit(facility)}>Edit</button>
                <button onClick={() => handleDelete(facility.id)}>
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

export default Facilities;