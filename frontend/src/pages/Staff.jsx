import React, { useState } from 'react';
import '../styles/Management.css';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update staff
      setStaff(
        staff.map((member) =>
          member.id === formData.id ? formData : member
        )
      );
      setIsEditing(false);
    } else {
      // Add new staff
      setStaff([...staff, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: '', name: '', role: '' });
  };

  const handleEdit = (member) => {
    setFormData(member);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setStaff(staff.filter((member) => member.id !== id));
  };

  return (
    <div className="management-container">
      <h2>Staff Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Staff Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Update Staff' : 'Add Staff'}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>
                <button onClick={() => handleEdit(member)}>Edit</button>
                <button onClick={() => handleDelete(member.id)}>
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

export default Staff;