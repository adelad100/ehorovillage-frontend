// src/pages/CreatePost.js
import React, { useState } from 'react';
import API from './api';
import './CreateEditPost.scss';

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setPreview(e.target.name === 'content' ? e.target.value : preview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!formData.title || !formData.content) {
      setError('All fields are required.');
      return;
    }
    try {
      await API.post('/posts', formData);
      setSuccess('Post created successfully!');
      setFormData({ title: '', content: '' });
      setPreview('');
    } catch (error) {
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="create-post-page">
      <div className="create-post-form">
        <h2>Create a New Post</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-create-post">Create Post</button>
        </form>
      </div>

      <div className="post-preview">
        <h3>Live Preview</h3>
        <div className="post-card">
          <h3>{formData.title || 'Post Title'}</h3>
          <p>{preview || 'Post content will be displayed here...'}</p>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
