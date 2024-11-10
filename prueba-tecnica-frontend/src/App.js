import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserView from './components/UserView';
import AdminView from './components/AdminView';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isSuperuser, setIsSuperuser] = useState(localStorage.getItem('isSuperuser') === 'true')

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token)
    const superuser = localStorage.getItem('isSuperuser');
    setIsSuperuser(superuser === 'true')
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isSuperuser');
    setIsAuthenticated(false);
    setIsSuperuser(false);
  };

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={isAuthenticated ? <Navigate to={isSuperuser ? "/dashboard" : "/home"} /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to={isSuperuser ? "/dashboard" : "/home"} /> : <Login onLoginSuccess={handleLoginSuccess} setIsSuperuser={setIsSuperuser}/>}
        />

        <Route
          path="/dashboard"
          element={isAuthenticated && isSuperuser ? <AdminView onLogout={handleLogout} /> : <Navigate to={isSuperuser ? "/dashboard" : "/login"} />}
        />

        <Route
          path="/home"
          element={isAuthenticated && !isSuperuser ? <UserView onLogout={handleLogout} /> : <Navigate to={isSuperuser ? "/dashboard" : "/login"}/>}
        />

      </Routes>
    </Router>
  );
}

export default App;

