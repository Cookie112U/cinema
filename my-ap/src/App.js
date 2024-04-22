import logo from './logo.svg';
import './App.css';
import Button from './components/button';
import Card from './components/card';
import Input from './components/input';
import { useState } from 'react';

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('movie');
  const [movies, setMovies] = useState([]);
  const [details, setDetails] = useState(null);

  const searchMovies = () => {
      fetch(`http://www.omdbapi.com/?apikey=c5ea9473&s=${searchTerm}&type=${type}`)
          .then(response => response.json())
          .then(data => {
              if (data.Response === 'True') {
                  setMovies(data.Search);
              } else {
                  setMovies([]);
              }
          })
          .catch(error => console.error('Error fetching data:', error));
  };

  const showDetails = (imdbID) => {
      fetch(`http://www.omdbapi.com/?apikey=c5ea9473&i=${imdbID}&plot=full`)
          .then(response => response.json())
          .then(data => {
              setDetails(data);
          })
          .catch(error => console.error('Error fetching details:', error));
  };

  return (
      <div className="container">
          <div className="search">
              <div className="title">
                  <h2>Title:</h2>
                  <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Enter movie title" />
              </div>
              <div className="type">
                  <h2>Type:</h2>
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                      <option value="movie">Movie</option>
                      <option value="series">Series</option>
                      <option value="episode">Episode</option>
                  </select>
              </div>
              <div>
                  <button type="button" onClick={searchMovies}>Search</button>
              </div>
          </div>
          <div id="movies-container" className="movies-container">
              {movies.map(movie => (
                  <div key={movie.imdbID} className="movie-card">
                      <img src={movie.Poster} alt={movie.Title} />
                      <div className="movie-info">
                          <h3>{movie.Title}</h3>
                          <p>Type: {movie.Type}</p>
                          <p>Year: {movie.Year}</p>
                          <button onClick={() => showDetails(movie.imdbID)}>Details</button>
                      </div>
                  </div>
              ))}
          </div>
          {details && (
              <div id="details-container" className="details-container">
                  <img src={details.Poster} alt={details.Title} />
                  <div>
                      <h3>{details.Title}</h3>
                      <p>Released: {details.Released}</p>
                      <p>Genre: {details.Genre}</p>
                      <p>Country: {details.Country}</p>
                      <p>Director: {details.Director}</p>
                      <p>Writer: {details.Writer}</p>
                      <p>Actors: {details.Actors}</p>
                      <p>Awards: {details.Awards}</p>
                  </div>
              </div>
          )}
      </div>
  );
}

export default MovieSearch;