import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[1];
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        zipcode: '',
        state: ''
    });

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data from backend
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:80/profile/${id}`);
                const userData = response.data.userProfile;
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:80/profile/${id}`, formData);
            alert('Profile updated successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <>
            <header>
                <h1><Link to="/">Fuel Ordering Project</Link></h1>
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
                            <input id="zipCode" name="zipCode" type="text" required  onChange={handleChange} />
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
                <h2>Current Profile Data</h2>
                {userData && (
                    <section>
                        <div className="info">
                            <label><strong>Full Name:</strong></label> {userData.name}
                        </div>
                        <div className="info">
                            <label><strong>Primary Address:</strong></label> {userData.address}
                        </div>
                        <div className="info">
                            <label><strong>City:</strong></label> {userData.city}
                        </div>
                        <div className="info">
                            <label><strong>Zip Code:</strong></label> {userData.zipcode}
                        </div>
                        <div className="info">
                            <label><strong>State:</strong></label> {userData.state}
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}

export default Profile;
