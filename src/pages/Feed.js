// src/pages/Feed.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from './api'; // Importing the Axios instance
import './Feed.scss'; // Importing the styles for the Feed page

function Feed() {
  const [posts, setPosts] = useState([]); // State to hold the posts data
  const [filter, setFilter] = useState('latest'); // State to hold the selected filter (default: 'latest')
  const [error, setError] = useState(''); // State to hold any error messages

  // Function to fetch posts based on the selected filter
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      // If no token, redirect to login (or show error)
      if (!token) {
        setError('Access Denied. Please log in.');
        return;
      }

      // Fetch posts based on the selected filter
      const response = await API.get(`/posts?filter=${filter}`, {
        headers: {
          Authorization: token, // Include the token in the request headers
        },
      });

      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        setPosts(response.data); // Set posts state with the fetched data
      } else {
        throw new Error('Posts data is not in expected array format');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Unable to fetch posts. Please try again later.');
    }
  };

  // Use the useEffect hook to call fetchPosts whenever the filter changes
  useEffect(() => {
    fetchPosts(); // Call fetchPosts function to load posts based on filter
  }, [filter]); // Dependency array: fetch posts whenever the filter state changes

  return (
    <div className="feed-page">
      <header className="feed-header">
        <h2>Community Feed</h2>
        <div className="filter-bar">
          <button
            className={filter === 'latest' ? 'active' : ''}
            onClick={() => setFilter('latest')}
          >
            Latest
          </button>
          <button
            className={filter === 'popular' ? 'active' : ''}
            onClick={() => setFilter('popular')}
          >
            Popular
          </button>
          <button
            className={filter === 'following' ? 'active' : ''}
            onClick={() => setFilter('following')}
          >
            Following
          </button>
        </div>
      </header>

      {/* Display error message if any */}
      {error && <p className="error-message">{error}</p>}

      <section className="post-list">
        {/* Conditional rendering: show message if no posts are available */}
        {Array.isArray(posts) && posts.length === 0 && !error && (
          <p>No posts available. Create the first post!</p>
        )}
        {/* Map through posts and display each post as a post card */}
        {Array.isArray(posts) &&
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <img
                  src={post.userAvatar || '/default-avatar.png'}
                  alt={post.username}
                  className="user-avatar"
                />
                <div className="post-info">
                  <h3>{post.username}</h3>
                  <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="post-content">
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 100)}...</p>
                <Link to={`/post/${post._id}`} className="view-post">
                  Read More
                </Link>
              </div>
              <div className="post-actions">
                <button className="like-btn">❤️ {post.likes || 0}</button>
                <Link to={`/post/${post._id}`} className="comment-btn">
                  💬 {Array.isArray(post.comments) ? post.comments.length : 0}
                </Link>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default Feed;
