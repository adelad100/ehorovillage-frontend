// src/pages/EditProfile.js
import React, { useState, useEffect } from 'react';
import API from './api'; // Import the Axios instance for API requests
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's current bio and profile picture
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get('/user/me', {
          headers: { Authorization: token },
        });
        setBio(response.data.user.bio);
        setProfilePicture(response.data.user.profilePicture);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile data.');
      }
    };

    fetchProfile();
  }, []);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('bio', bio);
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }
      const response = await API.put('/user/editProfile', formData, {
        headers: { Authorization: token },
      });
      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bio:</label>
          <textarea value={bio} onChange={handleBioChange} placeholder="Tell us about yourself..." />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input type="file" onChange={handleProfilePictureChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
