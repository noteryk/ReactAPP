import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-blue-600 p-4 text-white flex flex-col md:flex-row items-center justify-between">
      <h1 className="text-2xl font-bold mb-2 md:mb-0">WebFusion</h1>
      <nav className="flex space-x-4 mb-2 md:mb-0">
        <Link
          to="/giphy"
          className="p-2 bg-white text-blue-600 rounded hover:bg-gray-100"
        >
          Discover Memes
        </Link>
        <Link
          to="/weather"
          className="p-2 bg-white text-blue-600 rounded hover:bg-gray-100"
        >
          Weather Panel
        </Link>
        <Link
          to="/co2-calculator"
          className="p-2 bg-white text-blue-600 rounded hover:bg-gray-100"
        >
          Carbon Footprint Calculator
        </Link>
        <Link
          to="/space-explorer"
          className="p-2 bg-white text-blue-600 rounded hover:bg-gray-100"
        >
          Space Explorer
        </Link>
      </nav>
    </header>
  );
};

export default Header;