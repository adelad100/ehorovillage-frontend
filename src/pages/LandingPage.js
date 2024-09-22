// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss';

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Ehoro Village</h1>
        <p>Your inclusive community for creators</p>
      </header>
      <div className="button-group">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </div>
      <section className="features">
        <div className="feature-item">
          <span role="img" aria-label="community">🌟</span>
          <h3>Community</h3>
          <p>Connect with like-minded creators and share your journey.</p>
        </div>
        <div className="feature-item">
          <span role="img" aria-label="support">🤝</span>
          <h3>Support</h3>
          <p>Get support from peers and grow your creative projects.</p>
        </div>
        <div className="feature-item">
          <span role="img" aria-label="explore">🔍</span>
          <h3>Explore</h3>
          <p>Discover new ideas and collaborate with others.</p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
