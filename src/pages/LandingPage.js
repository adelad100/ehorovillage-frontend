// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss'; // Import styles for LandingPage

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="top-banner">
        <h2>Welcome to Ehorovillage</h2>
      </div>
      <header className="landing-header">
        <h1>Ehorovillage</h1>
        <p className="subtitle">A cozy community for creators. Connect, share, and grow together.</p>
        <div className="landing-buttons">
          <Link to="/register" className="btn-primary">Join Now</Link>
          <Link to="/login" className="btn-secondary">Log In</Link>
        </div>
      </header>
      <section className="features">
        <div className="feature">
          <span role="img" aria-label="share">🎨</span>
          <h2>Share Your Creativity</h2>
          <p>Post your work, get feedback, and connect with like-minded creators.</p>
        </div>
        <div className="feature">
          <span role="img" aria-label="communities">👥</span>
          <h2>Join Communities</h2>
          <p>Find groups that match your interests and join the conversation.</p>
        </div>
        <div className="feature">
          <span role="img" aria-label="inspire">✨</span>
          <h2>Inspire and Be Inspired</h2>
          <p>Explore what others are creating and let your imagination soar.</p>
        </div>
      </section>
      <footer className="landing-footer">
        <p>&copy; 2024 Ehorovillage. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
