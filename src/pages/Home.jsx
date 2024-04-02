import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
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
                <h2>Welcome to Our Website!</h2>
            </main>
          </>
        );
}

export default Home