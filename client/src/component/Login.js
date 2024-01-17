import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 
import NavScrollExample from './Navbar/Navbar';

export default function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/', {
        email,
        password,
      });

      if (res.data === 'exist') {
        history('/', { state: { id: email } });
      } else if (res.data === 'notexist') {
        alert('User has not signed up');
      }
    } catch (error) {
      alert('Wrong details');
      console.error(error);
    }
  }

  return (
    <>
    <NavScrollExample/>
    <div className="login-container">
      <h1>Login</h1>
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
          Login
        </button>
        <h3>or</h3>
        <Link to="/signup">
          <p>Signup Here</p>
        </Link>
      </form>
    </div>
    </>
  );
}
