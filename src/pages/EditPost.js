// src/pages/EditPost.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from './api'; // Import the Axios instance for API requests

function EditPost() {
  const { id } = useParams(); // Get the post ID from the URL parameters
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Fetch the post data when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.get(`/posts/${id}`);
        setFormData({
          title: response.data.post.title,
          content: response.data.post.content,
        });
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to fetch post data.');
      }
    };

    fetchPost();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      const token = localStorage.getItem('token');
      const response = await API.put(`/posts/${id}`, formData, {
        headers: { Authorization: token },
      });
      setSuccess('Post updated successfully!');
      navigate('/feed'); // Redirect to feed page after successful update
    } catch (error) {
      console.error('Error updating post:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An error occurred while updating the post.');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Post Title"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Post Content"
          required
        />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;
