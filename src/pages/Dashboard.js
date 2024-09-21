// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from './api'; // Assuming you have an Axios instance for API calls
import './Dashboard.scss';

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    // Fetch user data and recent posts
    const fetchData = async () => {
      try {
        const userResponse = await API.get('/user/profile');
        setUserData(userResponse.data);
        
        const postsResponse = await API.get('/posts/recent');
        setRecentPosts(postsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Welcome back, {userData.username}!</h2>
        <div className="quick-stats">
          <div className="stat">
            <h3>Posts</h3>
            <p>{userData.postCount}</p>
          </div>
          <div className="stat">
            <h3>Comments</h3>
            <p>{userData.commentCount}</p>
          </div>
          <div className="stat">
            <h3>Followers</h3>
            <p>{userData.followerCount}</p>
          </div>
        </div>
      </header>

      <section className="quick-access">
        <Link to="/create-post" className="card">
          <h3>Create Post</h3>
          <p>Share your thoughts with the community</p>
        </Link>
        <Link to="/feed" className="card">
          <h3>View Feed</h3>
          <p>See what others are sharing</p>
        </Link>
        <Link to="/edit-profile" className="card">
          <h3>Edit Profile</h3>
          <p>Update your personal information</p>
        </Link>
      </section>

      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentPosts.map((post) => (
            <div key={post._id} className="activity-item">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <Link to={`/post/${post._id}`} className="view-post">View Post</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
