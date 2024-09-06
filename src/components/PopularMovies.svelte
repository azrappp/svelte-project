<script>
    import MovieCard from './MovieCard.svelte';
    import ModalMovies  from './ModalMovies.svelte';
    export let popularMovies = [];
    export let errorPopular = null;

    let selectedMovie = null;
    let showModal = false;
    let movieDetails = {};

    async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3c7154fd5cd7a4412d001844acadc78d&language=en-US`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    const details = await response.json(); // Simpan hasilnya dalam variabel
    console.log(details); // Sekarang aman untuk logging
    return details; // Kembalikan hasilnya
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}


    function openModal(event) {
      selectedMovie = event.detail;
      fetchMovieDetails(selectedMovie.id).then(details => {
        movieDetails = {
          release_date: details.release_date,
          budget: details.budget,
          distributors: details.production_companies?.map(company => company.name).join(', ') || 'Unknown', // use production_companies
          based_on: details.based_on || 'Unknown',
          cinematography: details.cinematography || 'Unknown'
        };
        showModal = true;
      }).catch(error => {
        console.error('Error fetching movie details:', error);
      });
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

{#if showModal}
  <ModalMovies isOpen={showModal} movie={selectedMovie} details={movieDetails} on:close={closeModal} />
{/if}

