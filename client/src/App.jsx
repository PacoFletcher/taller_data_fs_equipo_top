import React, { useState } from 'react';
import './App.css';

const URL_BASE = 'http://localhost:5001/predict';
function App() {
  const [inputs, setInputs] = useState({
    surface: '',
    bedrooms: '',
    restrooms: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = new URLSearchParams({
      surface: inputs.surface,
      bedrooms: inputs.bedrooms,
      restrooms: inputs.restrooms
    }).toString();
    const response = await fetch(`${URL_BASE}?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }, 
    });

    const data = await response.json();

    setPrediction(data.prediction);
  };

  return (

    <div className="App">
      <h1 className="title">Housing Price Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label className="label" htmlFor="surface">Surface:</label>
        <input className="input" type="text" id="surface" name="surface" placeholder="Introduce a number of desired surface" value={inputs.surface} onChange={handleChange} />

        <label className="label" htmlFor="bedrooms">Bedrooms:</label>
        <input className="input" type="text" id="bedrooms" name="bedrooms" placeholder="Introduce a number of desired bedrooms" value={inputs.bedrooms} onChange={handleChange} />

        <label className="label" htmlFor="restrooms">Restrooms:</label>
        <input className="input" type="text" id="restrooms" name="restrooms" placeholder='Introduce a number of desired restrooms' value={inputs.restrooms} onChange={handleChange} />

        <button className="button" type="submit">Predict</button>
      </form>

      {prediction && (
        <p>Predicted Price: {prediction}</p>
      )}
    </div>
  );
}

export default App;