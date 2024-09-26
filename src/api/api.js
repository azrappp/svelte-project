const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Ambil dari variabel lingkungan

const getFetchOptions = () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`, // Gunakan API key dari env
  },
});

export async function fetchMovies({
  type = "popular",
  page = 1,
  language = "en-US",
} = {}) {
  const validTypes = ["popular", "top_rated"];

  if (!validTypes.includes(type)) {
    throw new Error(
      `Invalid type provided. Expected one of: ${validTypes.join(", ")}`
    );
  }

  const endpoint = `${BASE_URL}/movie/${type}?language=${language}&page=${page}`;
  const response = await fetch(endpoint, getFetchOptions());

  if (!response.ok) {
    const errorData = await response.json(); // Ambil data error untuk informasi lebih lanjut
    throw new Error(
      `Failed to fetch ${type} movies: ${
        errorData.status_message || "Unknown error"
      }`
    );
  }

  return await response.json();
}

export async function fetchGenres() {
  const endpoint = `${BASE_URL}/genre/movie/list?language=en-US`;
  const response = await fetch(endpoint, getFetchOptions());

  if (!response.ok) {
    const errorData = await response.json(); // Ambil data error untuk informasi lebih lanjut
    throw new Error(
      `Failed to fetch genres: ${errorData.status_message || "Unknown error"}`
    );
  }

  return await response.json();
}
