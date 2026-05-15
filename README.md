# Movie Finder API

A simple REST API built with Node.js and Express that fetches movie data from the [OMDb API](http://www.omdbapi.com/).

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```
   OMDB_API_KEY=your_key_here
   ```

3. Start the server:
   ```bash
   node server.js
   ```

The server runs on `http://localhost:3001` by default.

### Search movies by title
```
GET /api/search?title={title}
```
**Example:** `/api/search?title=Inception`

### Get movie details by IMDb ID
```
GET /api/movies/:id
```
**Example:** `/api/movies/tt1375666`

## Tech Stack

- Node.js
- Express
- Axios
- dotenv