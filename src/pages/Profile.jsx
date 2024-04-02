import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Profile = () => {
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
            <h2>Profile Management</h2>
            <section>
              <div className="info">
                <label htmlFor="name">Full Name: </label>
                <input id="name" type="text" required />
              </div>
              <div className="info">
                <label htmlFor="address">Primary Address: </label>
                <input id="address" type="text" required />
              </div>
              <div className="info">
                <label htmlFor="city">City: </label>
                <input id="city" type="text" required />
              </div>
              <div className="info">
                <label htmlFor="zip">Zip Code: </label>
                <input id="zip" type="text" required />
              </div>
              <div className="info">
                <label htmlFor="state">State: </label>
                <select id="state">
                  <option>select a state...</option>
                  <option>Alaska</option>
                  <option>Colorado</option>
                  <option>New Mexico</option>
                  <option>North Dakota</option>
                  <option>Oklahoma</option>
                  <option>Texas</option>
                </select>
              </div>
              <button>Update Profile</button>
            </section>
          </main>
        </>
      );
}

export default Profile