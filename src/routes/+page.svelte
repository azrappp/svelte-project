
<script>
 import { onMount } from 'svelte';
 import { fetchPopularMovies } from '../api/api.js';
//  import { MovieCard } from '../components/MovieCard.svelte';
 let movies = [];
 let error = null;

 onMount(async () => {
    try {
      const data = await fetchPopularMovies();
      console.log(data.results)
      movies = data.results;
    } catch (err) {
      error = err.message;
      console.error(err);
    }
  });
//   console.log(movies)
</script>

<nav class="flex flex-row border-b border-white border-opacity-10 bg-black backdrop-blur-lg bg-opacity-10 w-full px-8 py-4 items-center justify-between">
    <div class="text-white">Movie Album</div>
    <div class="flex flex-row gap-x-4">
        <!-- <a href="" class="text-white">Home</a>
        <a href="" class="text-white">Trending Movies</a>
        <a href="" class="text-white">Trending TV Shows</a> -->
    </div>
</nav>

<main>
    <div>
        <h2>Movies Today</h2>
        <div class="flex flex-row gap-x-2 overflow-hidden">
            {#if error}
  <p class="text-red-500">Error: {error}</p>
        {:else}
            {#each movies.slice(0, 6) as movie}
            <div class="flex flex-col mx-autorounded overflow-hidden shadow-lg ">
              <div class="relative w-12 h-16">
                <img class="w-full h-full object-cover" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title}>
              </div>
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2 text-white">{movie.title}</div>
                  <p class="text-white text-base">
                    {movie.overview.length > 100 ? movie.overview.slice(0, 100) + '...' : movie.overview}
                  </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span class="text-white">Rating: {movie.vote_average}</span>
                </div>
              </div>
            {/each}
       {/if}
        </div>
    </div>
</main>