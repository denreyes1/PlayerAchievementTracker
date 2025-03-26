// src/components/Signup.jsx
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';

const SIGNUP_MUTATION = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!, $role: String!) {
    registerUser(username: $username, email: $email, password: $password, role: $role) {
      id
      username
      email
      role
    }
  }
`;

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Player'); // Default role to 'Player'
  const [error, setError] = useState(null); // State for error message
  const [registerUser] = useMutation(SIGNUP_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before attempting signup
    try {
      const { data } = await registerUser({ variables: { username, email, password, role } });
      console.log('Signup successful:', data.registerUser);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message); // Set error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          className="form-control"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Player">Player</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Sign Up
      </button>
      <div className="text-center mt-3">
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;