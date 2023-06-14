import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleClick = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.userCreated) {
        window.location.href = 'http://localhost:3000/';
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
        <h1>Register</h1>
         <form onSubmit={handleClick}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Register</button>
        </form>
        <NavLink to="/login">Login</NavLink>
    </div>
  )
}

export default Register