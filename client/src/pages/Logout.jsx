import React from 'react'

export default function Logout() {
  return (
    <div>
      <h1>Logout</h1>
      <form action="http://localhost:5000/logout" method='POST'>
        <input type="submit" value="Logout" />
      </form>
    </div>
  )
}
