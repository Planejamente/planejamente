import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Psipanel from '../pages/Psipanel/Psipanel';
import Meetmark from '../pages/Meetmark/Meetmark';
// import About from '../pages/About/About'; // Supondo que você tenha uma página About

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/psipanel" element={<Psipanel />} />
        <Route path="/meetMark" element={<Meetmark />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;