<script>
  import MovieCard from './MovieCard.svelte';
  import Modal from './Modal.svelte';
  
  export let popularMovies = [];
  export let errorPopular = null;

  let selectedMovie = null;
  let showModal = false;
  let movieDetails = {};

  async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY_DETAILS}&language=en-US`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}


  async function openModal(event) {
      selectedMovie = event.detail;
      const details = await fetchMovieDetails(selectedMovie.id);
      console.log(details)
      if (details) {
        movieDetails = {
      genre_ids: details.genres.map(genre => genre.id),
      title: details.title,
      release_date: details.release_date,
      overview: details.overview,
      poster_path: details.poster_path,
      };

          showModal = true;
      }
  }

  function closeModal() {
      showModal = false;
      selectedMovie = null;
  }
</script>

<style>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>

<div>
  <h2 class="font-bold text-black hide-scrollbar text-4xl my-5">Film Popular</h2>
  <div class="container flex flex-row scrollbar-hidden hide-scrollbar overflow-x-auto gap-x-2">
      {#if errorPopular}
          <p class="text-red-500">Error: {errorPopular}</p>
      {:else}
          {#each popularMovies as movie}
              <MovieCard {movie} on:openModal={openModal} />
          {/each}
      {/if}
  </div>
</div>

<Modal isOpen={showModal} movie={movieDetails} on:close={closeModal} />
