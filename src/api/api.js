export async function fetchPopularMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzcxNTRmZDVjZDdhNDQxMmQwMDE4NDRhY2FkYzc4ZCIsIm5iZiI6MTcyNDg4NTU5Ny4wNTI4MDIsInN1YiI6IjY2Y2RlMWE5ZDhmNGZhMTBhMzYzYTM5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oGVmNjYidpyNxW9qEGwxDUhB3mw24BPNVFX-BkiFHrM",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return await response.json();
}
