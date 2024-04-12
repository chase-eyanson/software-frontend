import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/register', formData); // Adjust URL if needed
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <header>
        <h1><Link to="/">Group 74 Software Design Project</Link></h1>
      </header>
      <main>
        <h2>Registration</h2>
        <section>
          <form onSubmit={handleSubmit}>
            <div className="info">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="text" required onChange={handleChange} />
            </div>
            <div className="info">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required onChange={handleChange} />
            </div>
            <div className="info">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" required onChange={handleChange} />
            </div>
            <button type="submit">Register</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Registration;