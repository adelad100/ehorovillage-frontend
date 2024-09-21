// src/components/Comments.js
import React, { useState, useEffect } from 'react';
import API from './api'; // Import the Axios instance for API requests

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch comments when the component mounts or when postId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await API.get(`/comments/post/${postId}`);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to fetch comments.');
      }
    };

    fetchComments();
  }, [postId]);

  // Handle changes in the new comment input
  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  // Handle form submission to add a new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      const token = localStorage.getItem('token');
      const response = await API.post(
        '/comments/add',
        { content: newComment, postId },
        { headers: { Authorization: token } }
      );
      setComments([...comments, response.data.comment]); // Add the new comment to the list
      setNewComment(''); // Clear the input field
      setSuccess('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment.');
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.author.username}:</strong> {comment.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          name="newComment"
          value={newComment}
          onChange={handleChange}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default Comments;
