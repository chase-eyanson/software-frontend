import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[1];
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        zipCode: '',
        state: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:80/profile/${id}`, formData);
            alert('Profile updated successfully');
            window.location.reload(); // Refresh the page
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <>
            <header>
                <h1><Link to="/">Group 74 Software Design Project</Link></h1>
                <nav>
                    <ul>
                        <li><Link to={`/${id}/profile`}>Profile</Link></li>
                        <li><Link to={`/${id}/fuel-form`}>Fuel Quote Form</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h2>Profile Management</h2>
                <section>
                    <form onSubmit={handleSubmit}>
                        <div className="info">
                            <label htmlFor="fullName">Full Name: </label>
                            <input id="fullName" name="fullName" type="text" required onChange={handleChange} />
                        </div>
                        <div className="info">
                            <label htmlFor="address">Primary Address: </label>
                            <input id="address" name="address" type="text" required onChange={handleChange} />
                        </div>
                        <div className="info">
                            <label htmlFor="city">City: </label>
                            <input id="city" name="city" type="text" required onChange={handleChange} />
                        </div>
                        <div className="info">
                            <label htmlFor="zipCode">Zip Code: </label>
                            <input id="zipCode" name="zipCode" type="text" required onChange={handleChange} />
                        </div>
                        <div className="info">
                            <label htmlFor="state">State: </label>
                            <select id="state" name="state" onChange={handleChange}>
                                <option value="">Select a state...</option>
                                <option value="AK">Alaska</option>
                                <option value="CO">Colorado</option>
                                <option value="NM">New Mexico</option>
                                <option value="ND">North Dakota</option>
                                <option value="OK">Oklahoma</option>
                                <option value="TX">Texas</option>
                            </select>
                        </div>
                        <button type="submit">Update Profile</button>
                    </form>
                </section>
            </main>
        </>
    );
}

export default Profile;