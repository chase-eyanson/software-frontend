import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FuelForm = () => {
  const [gallonsRequested, setGallonsRequested] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [fuelQuotes, setFuelQuotes] = useState([]);

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/fuel-quote/:id`, {
        gallonsRequested,
        deliveryAddress,
        deliveryDate
      });
      if (response.data.success) {
        alert("Fuel quote added successfully");
        // Refresh fuel quote history
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
      const response = await axios.get('/fuel-quote/:id');
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
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/fuel-form">Fuel Quote Form</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <form onSubmit={handleOrderSubmit}>
          <h2>Fuel Quote Form</h2>
          <section>
            <div className="info">
              <label htmlFor="gallons">Enter the desired amount of fuel in gallons:</label>
              <input name="gallonsRequested" id="gallons" type="number" required value={gallonsRequested} onChange={(e) => setGallonsRequested(e.target.value)} />
            </div>
            <div className="info">
              <label htmlFor="address">Enter your delivery address:</label>
              <input name="deliveryAddress" id="address" type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
            </div>
            <div className="info">
              <label htmlFor="date">Pick a delivery date:</label>
              <input name="deliveryDate" id="date" type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
            </div>
            <div className="spacer"></div>
            <div className="info">
              <label>Suggested price per gallon:</label>
              <p><i>$2.5 per gallon</i></p>
            </div>
            <div className="info">
              <label>Total Amount Due: </label>
              <p><i>${gallonsRequested * 2.5}</i></p>
            </div>
            <button type="submit">Order</button>
          </section>
          <h2>Fuel Quote History</h2>
          <section>
            {fuelQuotes.map((quote, index) => (
              <div key={index} className="quote">
                <div className="info">
                  <label>Desired amount of fuel in gallons:</label>
                  <p>{quote.gallonsRequested}</p>
                </div>
                <div className="info">
                  <label>Delivery address:</label>
                  <p>{quote.deliveryAddress}</p>
                </div>
                <div className="info">
                  <label>Delivery date:</label>
                  <p>{quote.deliveryDate}</p>
                </div>
                <div className="info">
                  <label>Suggested price per gallon:</label>
                  <p>{quote.price}</p>
                </div>
                <div className="info">
                  <label>Total Amount Due: </label>
                  <p>{quote.gallonsRequested * quote.price}</p>
                </div>
              </div>
            ))}
          </section>
        </form>
      </main>
    </>
  );
}

export default FuelForm;