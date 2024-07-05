import React, { useState } from 'react';
import './Prediction.css';

const Prediction = () => {
  const [formData, setFormData] = useState({
    gender: '',
    married: '',
    education: '',
    // Add more attributes as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="prediction-container">
      <h2>Loan Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="married">Married</label>
          <select name="married" id="married" value={formData.married} onChange={handleChange}>
            <option value="">Select Marital Status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="education">Education</label>
          <select name="education" id="education" value={formData.education} onChange={handleChange}>
            <option value="">Select Education Level</option>
            <option value="Graduate">Graduate</option>
            <option value="Not Graduate">Not Graduate</option>
          </select>
        </div>

        {/* Add more form groups as needed */}

        <button type="submit" className="predict-btn">Predict</button>
      </form>
    </div>
  );
};

export default Prediction;
