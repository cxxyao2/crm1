import http from '../services/httpService';

const apiEndpoint = "http://localhost:5000/api/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + '/' +movieId);
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + '/' + movieId);
}


export function saveMovie(movie) {
  return http.post(apiEndpoint,movie);
}