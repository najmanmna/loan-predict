import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Prediction.css";

const Prediction = () => {
  const [formData, setFormData] = useState({
    gender: "",
    married: "",
    dependents: "",
    education: "",
    selfEmployed: "",
    applicantIncome: "",
    coapplicantIncome: "",
    loanAmount: "",
    loanAmountTerm: "",
    creditHistory: "",
    propertyArea: "",
  });
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("YOUR_BACKEND_URL_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error",
          text: errorData.message || response.statusText,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="prediction-container">
      <h2>Loan Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="married">Married</label>
          <select
            name="married"
            id="married"
            value={formData.married}
            onChange={handleChange}
          >
            <option value="">Select Marital Status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dependents">Dependents</label>
          <select
            name="dependents"
            id="dependents"
            value={formData.dependents}
            onChange={handleChange}
          >
            <option value="">Select Number of Dependents</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3+">3+</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="education">Education</label>
          <select
            name="education"
            id="education"
            value={formData.education}
            onChange={handleChange}
          >
            <option value="">Select Education Level</option>
            <option value="Graduate">Graduate</option>
            <option value="Not Graduate">Not Graduate</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="selfEmployed">Self Employed</label>
          <select
            name="selfEmployed"
            id="selfEmployed"
            value={formData.selfEmployed}
            onChange={handleChange}
          >
            <option value="">Select Self Employment Status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="applicantIncome">Income (in thousands)</label>
          <input
            type="number"
            name="applicantIncome"
            id="applicantIncome"
            value={formData.applicantIncome}
            onChange={handleChange}
            placeholder="Enter Amount"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="coapplicantIncome">
            Coapplicant Income (in thousands)
          </label>
          <input
            type="number"
            name="coapplicantIncome"
            id="coapplicantIncome"
            value={formData.coapplicantIncome}
            onChange={handleChange}
            placeholder="Enter Amount"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="loanAmount">Loan Amount (in thousands)</label>
          <input
            type="number"
            name="loanAmount"
            id="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            placeholder="Enter Amount"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="loanAmountTerm">Loan Amount Term (in months)</label>
          <input
            type="number"
            name="loanAmountTerm"
            id="loanAmountTerm"
            value={formData.loanAmountTerm}
            onChange={handleChange}
            placeholder="Term of Loan"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="propertyArea">Property Area</label>
          <select
            name="propertyArea"
            id="propertyArea"
            value={formData.propertyArea}
            onChange={handleChange}
          >
            <option value="">Select Property Area</option>
            <option value="Urban">Urban</option>
            <option value="Semi Urban">Semi Urban</option>
            <option value="Rural">Rural</option>
          </select>
        </div>

        <div className="form-group check">
          <label htmlFor="creditHistory">
            <input
              type="checkbox"
              name="creditHistory"
              id="creditHistory"
              checked={formData.creditHistory === "1"}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "creditHistory",
                    value: e.target.checked ? "1" : "0",
                  },
                })
              }
            />{" "}
            I agree with the credit history guidelines
          </label>
        </div>

        <button type="submit" className="predict-btn">
          Predict
        </button>
      </form>
    </div>
  );
};

export default Prediction;
