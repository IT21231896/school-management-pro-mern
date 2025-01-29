import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaBuilding, FaDoorOpen, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>School Management</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard/students">
                <FaUserGraduate /> Students
              </Link>
            </li>
            <li>
              <Link to="/dashboard/teachers">
                <FaChalkboardTeacher /> Teachers
              </Link>
            </li>
            <li>
              <Link to="/dashboard/staff">
                <FaUsers /> Staff
              </Link>
            </li>
            <li>
              <Link to="/dashboard/facilities">
                <FaBuilding /> Facilities
              </Link>
            </li>
            <li>
              <Link to="/dashboard/classrooms">
                <FaDoorOpen /> Classrooms
              </Link>
            </li>
          </ul>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;