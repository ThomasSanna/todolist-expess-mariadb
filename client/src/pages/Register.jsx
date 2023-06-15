import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Axios from 'axios'


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:5000/register', {username: username, password: password})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  


  return (
    <div>
        <h1>Register</h1>
         <form onSubmit={register}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Register</button>
        </form>
        <NavLink to="/login">Login</NavLink>
    </div>
  )
}

export default Register