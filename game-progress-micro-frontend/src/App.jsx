import React from 'react';
import Leaderboard from './components/Leaderboard'; // Import your custom component
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Game Progress Tracker</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}

export default App;