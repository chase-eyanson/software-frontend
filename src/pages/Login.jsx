import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {
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
        <h2>Login</h2>
        <section>
          <div className="info">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" />
          </div>
          <div className="info">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" />
          </div>
          <button>Login</button>
          <div className="info">
            <h4>New user? <Link to="/registration">Create new account.</Link></h4>
          </div>
        </section>
      </main>
    </>
    )
}

export default Login