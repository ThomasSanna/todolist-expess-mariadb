import React from 'react'
import { NavLink } from 'react-router-dom'

export default function register() {
  return (
    <div>
        <h1>Register</h1>
        <form action="http://localhost:5000/register" method="POST">
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" value="Register" />
        </form>
        <NavLink to="/login">Login</NavLink>
    </div>
  )
}