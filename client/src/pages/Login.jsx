import React from 'react'
import { NavLink } from 'react-router-dom'

export default function login() {
  return (
    <div>
        <h1>Login</h1>
        <form action="/loginsubmit" method="POST">
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" value="Login" />
        </form>
        <NavLink to="/register">Register</NavLink>
    </div>
  )
}