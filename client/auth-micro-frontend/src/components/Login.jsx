// src/components/Login.jsx
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      message
      user {
        id
        username
        email
        role
      }
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error message
  const [loginUser] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await loginUser({ variables: { username, password } });
      const user = data.loginUser.user;
      
      localStorage.setItem('token', data.loginUser.token);
      localStorage.setItem('userId', user.id);
  
      window.location.href = "/"; // Redirects to home after login
  
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
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
      <button type="submit" className="btn btn-primary mt-3">
        Log In
      </button>
      <div className="text-center mt-3">
        <p>
          Don't have an account? <Link to="/signup">Create a new account</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;