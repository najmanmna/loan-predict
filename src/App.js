import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Prediction from "./pages/Prediction.jsx";
import PerformanceAnalysis from "./pages/PerformanceAnalysis.jsx";

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/performance" element={<PerformanceAnalysis />} />
      </Routes>
    </Router>
  );
};

export default App;
