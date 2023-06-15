import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {

  return (
    <div>
      <h1>hello</h1>
        <NavLink to="/login">Login</NavLink> <br />
        <NavLink to="/register">Register</NavLink>  <br />
        <NavLink to="/logout">Logout</NavLink>  <br />
    </div>
  )
}
