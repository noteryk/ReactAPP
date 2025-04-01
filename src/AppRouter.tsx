import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Giphy from './pages/Giphy';
import CO2Calculator from './pages/CO2Calculator';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/co2calculator" element={<CO2Calculator />} />
    </Routes>
  );
}

export default AppRouter;
export {};
