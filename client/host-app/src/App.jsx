import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4"> {/* Bootstrap container for layout */}
        <Routes>
          <Route path="/" element={<div className="text-center"><h1>Home</h1><p>Welcome to the Home Page</p></div>} />
          <Route path="/auth" element={<div className="text-center"><h1>Auth Microservice</h1><p>Manage your authentication here.</p></div>} />
          <Route path="/game-progress" element={<div className="text-center"><h1>Game Progress Microservice</h1><p>Track your game progress here.</p></div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;