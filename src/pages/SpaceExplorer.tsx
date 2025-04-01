import React, { useState } from 'react';
import axios from 'axios';

const NASA_API_KEY = 'TrXvG1PFKLrPsWN686VctqhcBkuNUdykqVNImjuH';

export const fetchNASAImages = async () => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod`, {
      params: {
        api_key: NASA_API_KEY,
        count: 10, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching NASA images:', error);
    return [];
  }
};

const SpaceExplorer: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFetchImages = async () => {
    setError(null); // Clear any previous errors
    const results = await fetchNASAImages();
    if (results.length > 0) {
      setImages(results);
    } else {
      setError('An error occurred while fetching NASA images.');
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 text-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Space Explorer</h1>
      <button
        onClick={handleFetchImages}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Explore Space
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 overflow-y-auto max-h-[80vh]"> {/* Add scrolling for the grid */}
        {images.map((image) => (
          <div key={image.date} className="rounded shadow bg-white p-4">
            <img
              src={image.url}
              alt={image.title}
              className="rounded mb-2"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <h3 className="text-lg font-bold text-gray-800">{image.title}</h3>
            <p className="text-sm text-gray-600">{image.date}</p>
            <p className="text-sm text-gray-700">{image.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpaceExplorer;
