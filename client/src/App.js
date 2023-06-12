import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';

export const UserContext = createContext();


function App() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const usernameParam = urlParams.get('username');

  const [username, setUsername] = useState(usernameParam);

  return (
    <div className="App">
      <UserContext.Provider value={{ username, setUsername }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/logout" element={<h1>Logout</h1>} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
