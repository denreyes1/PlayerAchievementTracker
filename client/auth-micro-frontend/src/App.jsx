// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Auth Micro Frontend</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to /login */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;