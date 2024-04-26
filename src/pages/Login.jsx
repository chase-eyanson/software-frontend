import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:80/login', { email, password });
          console.log(response.data);
          navigate(`/${response.data.user.userID}/profile`);
      } catch (error) {
          console.error('Error during login:', error);
      }
  }

  return (
      <>
        <header>
          <h1>Fuel Ordering Project</h1>
        </header>
        <main>
          <h2>Login</h2>
          <section>
            <div className="info">
              <label htmlFor="email">Email</label>
              <input id="email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="info">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button onClick={handleClick}>Login</button>
            <div className='info'>
              <h4>New User? <Link to="/registration">Sign Up</Link></h4>
            </div>
          </section>
        </main>
      </>
  )
}

export default Login;