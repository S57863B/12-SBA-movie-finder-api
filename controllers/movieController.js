const axios = require('axios');

const OMDB_BASE_URL = 'http://www.omdbapi.com/';

/**
 * GET /api/search?title=<search term>
 * Searches for movies by title using the OMDb API.
 */
const searchMovies = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Title query parameter is required' });
  }

  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        s: title,
        apikey: process.env.OMDB_API_KEY,
      },
    });

    // OMDb returns Response: "False" with an Error field when nothing is found
    if (response.data.Response === 'False') {
      return res.status(404).json({ error: response.data.Error });
    }

    res.json(response.data.Search);
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    res.status(500).json({ error: 'Failed to fetch movie data from OMDb' });
  }
};

/**
 * GET /api/movies/:id
 * Fetches detailed info for a single movie by its IMDb ID.
 */
const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(OMDB_BASE_URL, {
      params: {
        i: id,
        apikey: process.env.OMDB_API_KEY,
      },
    });

    // OMDb returns Response: "False" when the ID is not found
    if (response.data.Response === 'False') {
      return res.status(404).json({ error: response.data.Error });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    res.status(500).json({ error: 'Failed to fetch movie details from OMDb' });
  }
};

module.exports = { searchMovies, getMovieDetails };