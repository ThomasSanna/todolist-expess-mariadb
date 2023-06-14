import React from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
    
    axios.get('http://localhost:5000/user')
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })

  return (
    <div>
      <h1>hello</h1>
        <NavLink to="/login">Login</NavLink> <br />
        <NavLink to="/register">Register</NavLink>  <br />
        <NavLink to="/logout">Logout</NavLink>  <br />
    </div>
  )
}
