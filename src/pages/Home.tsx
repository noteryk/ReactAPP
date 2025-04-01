import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-center p-4 overflow-hidden">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">WebFusion</h1>
      <p className="text-lg text-gray-700 max-w-2xl mb-4">
        <span className="text-blue-500 font-semibold">WebFusion</span> is an advanced web platform integrating various APIs to deliver valuable functionalities. Explore <span className="text-blue-500 font-semibold">memes</span>, <span className="text-blue-500 font-semibold">weather forecasts</span>, <span className="text-blue-500 font-semibold">carbon footprint calculations</span>, and <span className="text-blue-500 font-semibold">space exploration</span> in one place.
      </p>
      <p className="text-lg text-gray-700 max-w-2xl mb-4">
        Our platform is designed to provide a seamless user experience, ensuring that you can access all the tools you need in a single, unified interface. Whether you're looking for entertainment, information, or tools to make a positive impact on the environment, <span className="text-blue-500 font-semibold">WebFusion</span> has you covered.
      </p>
      <p className="text-lg text-gray-700 max-w-2xl">
        Join us today and become part of a growing community that values innovation, sustainability, and exploration. Together, we can make a difference and explore the endless possibilities of the digital world.
      </p>
    </div>
  );
};

export default Home;