import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Todos from './pages/Todo';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// data is stored in localstorage even if page is refreshed
const storageUser = () => {
  const s = localStorage.getItem('user');
  return s ? JSON.parse(s) : null;
};

function App() {
  const [user, setUser] = useState(storageUser());
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  //login function set token and user in state 
  const login = ({ token, user }) => {
    setToken(token);
    setUser(user);
  };

  //logout function clearing token and user
  const logout = () => {
    setToken(null);
    setUser(null);
  };


  return (
     <BrowserRouter>
      <Navbar user={user} logout={logout} />
      <div className="bg-pagebg min-h-screen pt-20">
        <div className="max-w-3xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/todos" element={token ? <Todos token={token} /> : <Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
