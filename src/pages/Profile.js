// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api'; // Import the configured Axios instance

function Profile() {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return navigate('/login'); // Redirect to login if no token is found
        }

        const response = await API.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Unable to fetch profile. Please try again later.');
      }
    };
    fetchProfile();
  }, [navigate]);

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="profile-info">
        <h3>Username: {profile.username}</h3>
        <p>Email: {profile.email}</p>
        {/* Add more profile information here as needed */}
      </div>
    </div>
  );
}

export default Profile;
