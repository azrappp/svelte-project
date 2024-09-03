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

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzcxNTRmZDVjZDdhNDQxMmQwMDE4NDRhY2FkYzc4ZCIsIm5iZiI6MTcyNDg4NTU5Ny4wNTI4MDIsInN1YiI6IjY2Y2RlMWE5ZDhmNGZhMTBhMzYzYTM5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oGVmNjYidpyNxW9qEGwxDUhB3mw24BPNVFX-BkiFHrM",
    },
  };

  const endpoint = `https://api.themoviedb.org/3/movie/${type}?language=${language}&page=${page}`;

  const response = await fetch(endpoint, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} movies`);
  }

  return await response.json();
}

export async function fetchGenres() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzcxNTRmZDVjZDdhNDQxMmQwMDE4NDRhY2FkYzc4ZCIsIm5iZiI6MTcyNDg4NTU5Ny4wNTI4MDIsInN1YiI6IjY2Y2RlMWE5ZDhmNGZhMTBhMzYzYTM5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oGVmNjYidpyNxW9qEGwxDUhB3mw24BPNVFX-BkiFHrM",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
    options
  );
  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  return await response.json();
}
