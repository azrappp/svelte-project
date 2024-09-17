import { fetchMovies, fetchGenres } from "../api/api.js";

export const getPopularMovies = async () => {
  try {
    const data = await fetchMovies({ type: "popular" });
    return data.results;
  } catch (err) {
    throw new Error("Failed to fetch popular movies");
  }
};

export const getTopRatedMovies = async () => {
  try {
    const data = await fetchMovies({ type: "top_rated" });
    return data.results;
  } catch (err) {
    throw new Error("Failed to fetch top rated movies");
  }
};

export const getGenres = async () => {
  try {
    const data = await fetchGenres();
    return data.genres;
  } catch (err) {
    throw new Error("Failed to fetch genres");
  }
};
