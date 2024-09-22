// src/pages/Feed.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api'; // Import the configured Axios instance

function Feed() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('latest'); // Default filter
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch posts based on the selected filter
    const fetchPosts = async () => {
      try {
        const response = await API.get(`/api/posts?filter=${filter}`);
        if (Array.isArray(response.data)) {
          setPosts(response.data); // Ensure data is an array
        } else {
          throw new Error('Posts data is not in expected array format');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Unable to fetch posts. Please try again later.');
      }
    };
    fetchPosts();
  }, [filter]);

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

      {error && <p className="error-message">{error}</p>}

      <section className="post-list">
        {posts.length === 0 && !error && <p>No posts available. Create the first post!</p>}
        {posts.map((post) => (
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
              <button className="like-btn">❤️ {post.likes}</button>
              <Link to={`/post/${post._id}`} className="comment-btn">
                💬 {post.comments.length}
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Feed;
