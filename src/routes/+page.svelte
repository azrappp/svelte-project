<script>
  import { onMount } from 'svelte';
  import { fetchMovies , fetchGenres} from '../api/api.js';

  let popularMovies = [];
  let homeMovies = [];
  let topRatedMovies = [];
  let genres = [];
  let errorPopular = null;
  let errorTopRated = null;
  let errorGenres = null;
  let activeMovieIndex = 0;
  let interval;

  onMount(async () => {
    interval = setInterval(() => {
      activeMovieIndex = (activeMovieIndex + 1) % homeMovies.length;
    }, 5000);
    try {
      const dataGenres = await fetchGenres(); // Ambil daftar genre
      genres = dataGenres.genres;
      const dataPopular = await fetchMovies({type:'popular'}); // Ambil film populer
      popularMovies = dataPopular.results; 
      homeMovies =  dataPopular.results.slice(0,4);
      console.log(homeMovies)
      const dataTopRated = await fetchMovies({type:'top_rated'}); // Ambil film dengan rating tertinggi
      topRatedMovies = dataTopRated.results; // Ambil semua film top-rated
    } catch (err) {
      if (popularMovies.length === 0) {
        errorPopular = err.message;
      }
      if (topRatedMovies.length === 0) {
        errorTopRated = err.message;
      }
      console.error(err);
      if (genres.length === 0) {
        errorGenres = err.message;
      }
      console.error(err);
    }
    return () => clearInterval(interval);
  });

  const setActiveMovie = (index) => {
    activeMovieIndex = index;
  };

  const getFontSize = (title) => {
  const words = title.split(' ');
  const maxWordLength = Math.max(...words.map(word => word.length));
  if (maxWordLength > 9) {
    return 'text-2xl';
  } else {
    return 'text-4xl';
  }
};

  const getGenreNames = (genreIds) => {
    return genreIds.map(id => {
      const genre = genres.find(g => g.id === id);
      return genre ? genre.name : 'Unknown';
    }).join(' / ');
  };
</script>

<style>
  .scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
.transition-transform {
    transition: transform 1s ease-in-out;
  }

</style>
<nav class="font-sans flex flex-row border-b border-black border-opacity-10 bg-white backdrop-blur-lg bg-opacity-10 w-full px-28  py-4 items-center justify-between">
  <div class="text-black font-bold">WatchMovie</div>
  <div class="flex flex-row gap-x-4">
    <a href="/movie" class="text-black font-normal font-san text-sm">Movie</a>
    <a href="/tvseries" class="text-black font-normal font-sans text-sm">Tv Series</a>
    <a href="/anime" class="text-black font-normal font-sans text-sm">Anime</a>
    <a href="/friend" class="text-black font-normal font-sans text-sm">Friends</a>
  </div>
</nav>

<main class="mx-16 md:mx-32 lg:mx-36 pt-6 items-center">
  <!-- Hero Section -->
  <div class="relative h-[460px]   w-full flex items-center text-left bg-cover bg-center rounded-2xl transition-transform duration-1000 ease-in-out"
  style="background-image: url('https://image.tmdb.org/t/p/w1280{homeMovies[activeMovieIndex]?.backdrop_path}');">
  <div class="font-sans absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-gray-900 to-gray-700/10 rounded-lg"></div>
  <div class="flex flex-col justify-between w-full h-full py-6 mx-11">
    <div class="flex  justify-end items-center mt-2">
      {#if !errorPopular && homeMovies.length > 0}
        <div class="md:px-7 z-10 flex flex-col items-start gap-2 max-w-[402px]">
          <p class="line-clamp-2 text-ellipsis overflow-hidden font-normal text-white text-xl">
            {getGenreNames(homeMovies[activeMovieIndex].genre_ids)}
          </p>
          <p class="line-clamp-2 text-ellipsis overflow-hidden font-bold text-white text-4xl">
            {homeMovies[activeMovieIndex].title}
          </p>
          <p class="text-xl text-white">⭐{homeMovies[activeMovieIndex].vote_average}</p>
          <p class="font-grey text-gray-300 font-normal text-xl line-clamp-4">
            {homeMovies[activeMovieIndex].overview}
          </p>
          <button class="px-3 py-2 text-black font-semibold bg-yellow-500 text-xl rounded-md">Add to Playlist +</button>
        </div>
      {:else if errorPopular}
        <p class="text-red-500">Error: {errorPopular}</p>
      {/if}
    </div>
    <div class="flex flex-row gap-x-1 justify-center">
      {#each homeMovies as movie, index}
        <button
          class="w-10 h-2 bg-white opacity-60 cursor-pointer {index === activeMovieIndex ? 'bg-opacity-100' : 'bg-opacity-20 '}"
          on:click={() => setActiveMovie(index)}
        ></button>
      {/each}
    </div>
  </div>
</div>


    <!-- Movies Section -->
    <div>
      <h2 class="font-bold text-black hide-scrollbar text-4xl my-5">Film Popular</h2>
      <div class="container flex flex-row scrollbar-hidden hide-scrollbar overflow-x-auto gap-x-2">
        {#if errorPopular}
          <p class="text-red-500">Error: {errorPopular}</p>
        {:else}
          {#each popularMovies as movie}
            <div class="relative h-[367px] w-60 flex-shrink-0 flex items-end justify-start text-left bg-cover bg-center rounded-2xl"
              style="background-image: url('https://image.tmdb.org/t/p/w500{movie.poster_path}');">
              <div class="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900 rounded-lg"></div>
  
              <div class="flex mx-4 w-full flex-col mb-5 z-10 gap-y-1">
                <div class="flex flex-row items-end gap-x-1 flex-shrink">
                  <p class={`font-bold text-white ${getFontSize(movie.title)}`}>{movie.title}</p>
                  <p class="font-light text-white text-sm">{movie.release_date.slice(0, 4)}</p>
                </div>
                <div class="flex flex-row justify-between items-end">
                  <div class="flex flex-col gap-y-0.5">
                    <p class="text-xs font-light text-white">⭐{movie.vote_average}</p>
                    <p class="ms-1 text-xs font-light text-white">{movie.vote_count} voted</p>
                  </div>
                  <button class="px-2 h-6 bg-yellow-500 font-medium text-black">+</button>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>        
    </div>
  <!-- Movies Section -->
  <div>
    <h2 class="font-bold text-black text-4xl my-5">Film Terbaik</h2>
    <div class="container flex flex-row scrollbar-hidden overflow-x-auto gap-x-2">
      {#if errorTopRated}
        <p class="text-red-500">Error: {errorTopRated}</p>
      {:else if topRatedMovies.length > 0}
        {#each topRatedMovies as movie}
          <div class="relative h-[367px] w-60 flex-shrink-0 flex items-end justify-start text-left bg-cover bg-center rounded-2xl"
            style="background-image: url('https://image.tmdb.org/t/p/w500{movie.poster_path}');">
            <div class="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900 rounded-lg"></div>
            <div class="flex mx-4 w-full flex-col mb-5 z-10 gap-y-1">
              <div class="flex flex-row items-end gap-x-1 flex-shrink">
                <p class={`font-bold text-white ${getFontSize(movie.title)}`}>{movie.title}</p>
                <p class="font-light text-white text-sm">{movie.release_date.slice(0, 4)}</p>
              </div>
              <div class="flex flex-row justify-between items-end">
                <div class="flex flex-col gap-y-0.5">
                  <p class="text-xs font-light text-white">⭐{movie.vote_average}</p>
                  <p class="ms-1 text-xs font-light text-white">{movie.vote_count} voted</p>
                </div>
                <button class="px-2 h-6 bg-yellow-500 font-medium text-black">+</button>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>        
  </div>
</main>
