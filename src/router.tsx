import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Giphy from './pages/Giphy';
import Weather from './pages/Weather';
import CO2Calculator from './pages/CO2Calculator';
import SpaceExplorer from './pages/SpaceExplorer';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/giphy" element={<Giphy />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/co2-calculator" element={<CO2Calculator />} />
      <Route path="/space-explorer" element={<SpaceExplorer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;