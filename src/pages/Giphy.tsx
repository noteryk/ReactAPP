import React, { useState } from 'react';
import axios from 'axios';

const GIPHY_API_KEY = 'tAByUdBl3zvwFTwwLKiS2uXNEcob2HU2'; // Ensure this is a valid API key

export const fetchGiphy = async (query: string) => {
  try {
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        api_key: GIPHY_API_KEY,
        q: query,
        limit: 12, // Limit to 12 memes
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Giphy data:', error);
    return [];
  }
};

const Giphy: React.FC = () => {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search term.');
      return;
    }
    setError(null); // Clear any previous errors
    const results = await fetchGiphy(query);
    setGifs(results);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Giphy Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for memes..."
        className="border border-gray-300 rounded p-2 mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            className="rounded shadow"
            style={{ width: '150px', height: '150px' }} // Set uniform width and height
          />
        ))}
      </div>
    </div>
  );
};

export default Giphy;
