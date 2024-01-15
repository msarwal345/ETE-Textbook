import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Import your CSS file

export default function Signup() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/signup', {
        email,
        password,
      });

      if (res.data === 'exist') {
        alert('User Exists');
      } else if (res.data === 'notexist') {
        history('/home', { state: { id: email } });
      }
    } catch (error) {
      alert('Wrong details');
      console.error(error);
    }
  }

  return (
    <div className="signup-container">
      <h1>Sign up</h1>
      <form>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" onClick={submit}>
          Sign Up
        </button>
        <h3>or</h3>
        <Link to="/">
          <p>Login Here</p>
        </Link>
      </form>
    </div>
  );
}
