// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss'; // Create a separate stylesheet for the Sidebar

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-links">
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
        <li>
          <Link to="/messages">Messages</Link>
        </li>
        <li>
          <Link to="/groups">Groups</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
