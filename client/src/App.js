import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Register from "./pages/Register";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Logout from "./pages/Logout.jsx";



function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/', { withCredentials: true })
      .then((res) => {
        setUsername(res.data.username);
        console.log('Response app !', res.data.username);
      })
      .catch((err) => {
        console.log('Error app', err);
      })
  }, [])


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/username' element={<h1>{username || 'no username'}</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
