// Frontend
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FuelForm = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[1];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gallonsRequested: '',
    deliveryAddress: '',
    state: '',
    deliveryDate: '',
    suggestedPricePerGallon: '',
    totalPrice: ''
  });

  const [fuelQuotes, setFuelQuotes] = useState([]);

  useEffect(() => {
    fetchFuelQuoteHistory();
  }, []);

  const handleChange = (e) =>{
    setFormData(prev=>({...prev, [e.target.name]: e.target.value }))
  }

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    try {
      // Parse gallonsRequested as an integer
      const gallonsRequested = parseInt(formData.gallonsRequested);
      // Check if gallonsRequested is a valid number
      if (isNaN(gallonsRequested)) {
        alert("Please enter a valid number for gallons requested");
        return;
      }
      const response = await axios.post(`http://localhost:80/fuel-quote/${id}`, { ...formData, gallons: gallonsRequested });
      if (response.data.success) {
        alert("Fuel quote added successfully");
        window.location.reload();
      } else {
        alert("Failed to add fuel quote");
      }
    } catch (error) {
      console.error("Error adding fuel quote:", error);
    }
  };

  const fetchFuelQuoteHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:80/fuel-quote/${id}`);
      if (response.data.success) {
        const userQuotes = response.data.userQuotes.map(quote => ({
          ...quote,
          date: new Date(quote.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }),
          pricePerGallon: `$${quote.pricePerGallon.toFixed(3)}`, 
          totalPrice: <b>{`$${quote.totalPrice.toFixed(2)}`}</b> 
        }));
        setFuelQuotes(userQuotes);
      } else {
        alert("Failed to fetch fuel quote history");
      }
    } catch (error) {
      console.error("Error fetching fuel quote history:", error);
    }
  };

  const handleGetQuote = async () => {
    const gallonsRequested = parseInt(formData.gallonsRequested);
    if (isNaN(gallonsRequested)) {
      alert("Please enter a valid number for gallons requested");
      return;
    }
    const state = formData.state;
    const hasHistory = fuelQuotes.length > 0; // Assuming if there are any quotes, then the user has history
    
    try {
      const response = await axios.post(`http://localhost:80/calculate-price`, { gallonsRequested, state, hasHistory });
      if (response.data.success) {
        const totalPrice = response.data.totalPrice;
        const suggestedPricePerGallon = totalPrice / gallonsRequested;
        setFormData(prev => ({
          ...prev,
          suggestedPricePerGallon,
          totalPrice
        }));
      } else {
        alert("Failed to calculate price");
      }
    } catch (error) {
      console.error("Error calculating price:", error);
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
        <form onSubmit={handleOrderSubmit}>
          <h2>Fuel Quote Form</h2>
          <section>
            <div className="info">
              <label htmlFor="gallons">Enter the desired amount of fuel in gallons:</label>
              <input name="gallonsRequested" id="gallons" type="number" required onChange={handleChange} />
            </div>
            <div className="info">
              <label htmlFor="address">Enter your delivery address:</label>
              <input name="deliveryAddress" id="address" type="text" required onChange={handleChange} />
            </div>
            <div className="info">
              <label htmlFor="state">State: </label>
              <select id="state" name="state" required onChange={handleChange}>
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
              <p><i>${formData.suggestedPricePerGallon ? formData.suggestedPricePerGallon.toFixed(3) : ''}</i></p>
            </div>
            <div className="info">
              <label>Total Amount Due: </label>
              <p><i>${formData.totalPrice ? formData.totalPrice.toFixed(2) : ''}</i></p>
            </div>
            <button type="button" onClick={handleGetQuote}>Get Quote</button>
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
