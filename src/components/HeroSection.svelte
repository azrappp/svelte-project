<script>
    export let homeMovies;
    export let activeMovieIndex = 0;
    export let setActiveMovie;
    export let errorPopular;
    export let getGenreNames;
  
    $: currentMovie = homeMovies[activeMovieIndex];
  </script>
  
  <div 
    class="relative h-[460px] w-full flex items-center text-left bg-cover bg-center rounded-2xl transition-transform duration-1000 ease-in-out"
    style="background-image: url('https://image.tmdb.org/t/p/w1280{currentMovie?.backdrop_path || "/path-to-fallback-image.jpg"}');"
  >
    <div class="font-sans absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-gray-900 to-gray-700/10 rounded-lg"></div>
    
    <div class="flex flex-col justify-between w-full h-full py-6 mx-11">
      <div class="flex justify-end items-center mt-2">
        {#if !errorPopular && currentMovie}
          <div class="md:px-7 z-10 flex flex-col items-start gap-2 max-w-[402px]">
            <p class="line-clamp-2 text-ellipsis overflow-hidden font-normal text-white text-xl">
              {getGenreNames(currentMovie.genre_ids)}
            </p>
            <p class="line-clamp-2 text-ellipsis overflow-hidden font-bold text-white text-4xl">
              {currentMovie.title}
            </p>
            <p class="text-xl text-white">⭐ {currentMovie.vote_average}</p>
            <p class="font-grey text-gray-300 font-normal text-xl line-clamp-4">
              {currentMovie.overview}
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
            class="w-10 h-2 bg-white opacity-60 cursor-pointer"
            class:bg-opacity-100={index === activeMovieIndex}
            class:bg-opacity-20={index !== activeMovieIndex}
            on:click={() => setActiveMovie(index)}
            aria-label="Select movie {index + 1}"
          ></button>
        {/each}
      </div>
    </div>
  </div>
  