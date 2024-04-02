import React from 'react';
import { Link } from 'react-router-dom';

const Registration = () => {
  return (
    <>
      <header>
        <h1><Link to="/">Group 74 Software Design Project</Link></h1>
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/fuel-form">Fuel Quote Form</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Registration</h2>
        <section>
          <div className="info">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" required />
          </div>
          <div className="info">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required />
          </div>
          <div className="info">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" required />
          </div>
          <button>Register</button>
        </section>
      </main>
    </>
  );
}

export default Registration;