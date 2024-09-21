// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.scss';

function Profile() {
  const [user, setUser] = useState(null); // To hold the user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        // If no token, redirect to login
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch the user profile data from the backend
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: token, // Include the token in the Authorization header
          },
        });

        setUser(response.data); // Set the user data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Unable to fetch profile data. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  if (loading) {
    return <div className="profile-page">Loading...</div>; // Display loading message while data is being fetched
  }

  if (error) {
    return <div className="profile-page error">{error}</div>; // Display error message if there's an issue
  }

  return (
    <div className="profile-page">
      {user && (
        <div className="profile-card">
          <img
            src={user.profilePicture || '/default-avatar.png'}
            alt={user.username}
            className="profile-picture"
          />
          <h2>{user.username}</h2>
          <p>{user.email}</p>
          <p>{user.bio}</p>
          {/* Display additional user information here */}
        </div>
      )}
    </div>
  );
}

export default Profile;
