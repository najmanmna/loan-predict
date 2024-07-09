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
    creditHistory: false,
    propertyArea: "",
  });
  console.log(formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map form data to backend format
    const backendData = {
      income: parseFloat(formData.applicantIncome),
      coapplicant_income: parseFloat(formData.coapplicantIncome),
      loan_amount: parseFloat(formData.loanAmount),
      loan_amount_term: parseFloat(formData.loanAmountTerm),
      credit_history: formData.creditHistory ? 1 : 0,
      gender_male: formData.gender === "Male" ? 1 : 0,
      gender_female: formData.gender === "Female" ? 1 : 0,
      married_yes: formData.married === "Yes" ? 1 : 0,
      married_no: formData.married === "No" ? 1 : 0,
      dependents_0: formData.dependents === "0" ? 1 : 0,
      dependents_1: formData.dependents === "1" ? 1 : 0,
      dependents_2: formData.dependents === "2" ? 1 : 0,
      dependents_3_plus: formData.dependents === "3+" ? 1 : 0,
      education_graduate: formData.education === "Graduate" ? 1 : 0,
      education_not_graduate: formData.education === "Not Graduate" ? 1 : 0,
      self_employed_yes: formData.selfEmployed === "Yes" ? 1 : 0,
      self_employed_no: formData.selfEmployed === "No" ? 1 : 0,
      property_area_rural: formData.propertyArea === "Rural" ? 1 : 0,
      property_area_semiurban: formData.propertyArea === "Semi Urban" ? 1 : 0,
      property_area_urban: formData.propertyArea === "Urban" ? 1 : 0,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendData),
      });
      if (response.ok) {
        const data = await response.json();
        const predictedClass = data["Predicted Class"];
        let predictionResult;

        if (predictedClass === 1) {
          predictionResult = "Loan Approved";
          Swal.fire({
            title: "Prediction Result",
            text: predictionResult,
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          predictionResult = "Loan Not Approved";
          Swal.fire({
            title: "Prediction Result",
            text: predictionResult,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error",
          text: errorData.message || response.statusText,
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "warning",
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
              checked={formData.creditHistory}
              onChange={handleChange}
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
