import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const FuelForm = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[1];

  const [formData, setFormData] = useState({
    gallonsRequested: '',
    deliveryAddress: '',
    deliveryDate: '',
    state: '',
  });

  const [fuelQuotes, setFuelQuotes] = useState([]);

  useEffect(() => {
    fetchFuelQuoteHistory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/fuel-quote/${id}`, formData);
      if (response.data.success) {
        alert("Fuel quote added successfully");
        fetchFuelQuoteHistory();
      } else {
        alert("Failed to add fuel quote");
      }
    } catch (error) {
      console.error("Error adding fuel quote:", error);
    }
  };

  const fetchFuelQuoteHistory = async () => {
    try {
      const response = await axios.get(`/fuel-quote/${id}`);
      if (response.data.success) {
        setFuelQuotes(response.data.userQuotes);
      } else {
        alert("Failed to fetch fuel quote history");
      }
    } catch (error) {
      console.error("Error fetching fuel quote history:", error);
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
        <form onSubmit={handleOrderSubmit}>
          <h2>Fuel Quote Form</h2>
          <section>
            <div className="info">
              <label htmlFor="gallons">Enter the desired amount of fuel in gallons:</label>
              <input name="gallonsRequested" id="gallons" type="number" required value={formData.gallonsRequested} onChange={handleChange} />
            </div>
            <div className="info">
              <label htmlFor="address">Enter your delivery address:</label>
              <input name="deliveryAddress" id="address" type="text" required value={formData.deliveryAddress} onChange={handleChange} />
            </div>
            <div className="info">
              <label htmlFor="state">State: </label>
              <select id="state" name="state" required onChange={handleChange} value={formData.state}>
                <option value="">Select a state...</option>
                <option value="AK">Alaska</option>
                <option value="CO">Colorado</option>
                <option value="NM">New Mexico</option>
                <option value="ND">North Dakota</option>
                <option value="OK">Oklahoma</option>
                <option value="TX">Texas</option>
              </select>
            </div>
            <div className="info">
              <label htmlFor="date">Pick a delivery date:</label>
              <input name="deliveryDate" id="date" type="text" required placeholder='YYYY-MM-DD' onChange={handleChange} />
            </div>
            <div className="spacer"></div>
            <div className="info">
              <label>Suggested price per gallon:</label>
              <p><i>$2.5 per gallon</i></p>
            </div>
            <div className="info">
              <label>Total Amount Due: </label>
              <p><i>${formData.gallonsRequested * 2.5}</i></p>
            </div>
            <button type="submit">Order</button>
          </section>
          <h2>Fuel Quote History</h2>
          <section>
            <table>
              <thead>
                <tr>
                  <th>Gallons requested</th>
                  <th>Delivery address</th>
                  <th>Delivery date</th>
                  <th>Price per gallon</th>
                  <th>Total price</th>
                </tr>
              </thead>
              <tbody>
                {fuelQuotes.map((quote, index) => (
                  <tr key={index}>
                    <td>{quote.gallons}</td>
                    <td>{quote.address}</td>
                    <td>{quote.date}</td>
                    <td>{quote.pricePerGallon}</td>
                    <td>{quote.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </form>
      </main>
    </>
  );
}

export default FuelForm;