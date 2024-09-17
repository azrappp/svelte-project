<script>
  import { onMount } from 'svelte';
  import {fetchGenres} from '../api/api.js';
  export let isOpen = false;
  export let movie = {};
  let genres = [];  

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function getGenres(){
    onMount(async () => {
    try {
        const dataGenres = await fetchGenres(); // Ambil daftar genre
        genres = dataGenres.genres;
    } catch (err) {
      if (genres.length === 0) {
        errorGenres = err.message;
      }
    }
  });
  }

  function close() {
    isOpen = false;
    dispatch('close');
  }

  const getGenreNames = (genreIds) => {
    getGenres();
    console.log("iki genre")
    console.log(genres);
    return genreIds.map(id => {
      const genre = genres.find(g => g.id === id);
      return genre ? genre.name : 'Unknown';
    }).join(', ');
  };
  console.log(movie.genre_ids)
</script>

{#if isOpen}
  <div class="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50" on:click={close}>
    <div class="bg-white max-w-2xl rounded-2xl mx-4" on:click|stopPropagation>
      <div
        class="relative h-48 md:h-64 w-full flex items-end justify-start text-left bg-cover bg-center rounded-t-2xl"
        style="background-image: url('https://image.tmdb.org/t/p/w500{movie.poster_path}');"
      >
        <div class="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900 rounded-lg"></div>
        <main class="px-5 md:px-7 pb-7 z-10 gap-y-4 flex flex-col">
          <div class="flex flex-row gap-x-1 items-end">
            <p class="text-4xl lg:text-7xl font-bold text-white">{movie.title}</p>
            <p class="text-white text-2xl font-normal">{movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'}</p>
          </div>
          <button class="px-3 max-w-48 py-2 text-black font-semibold bg-yellow-500 text-xl rounded-md">Add to Playlist +</button>
        </main>        
      </div>
      <div class="px-4 py-2">
        <div>
          <p class="text-black bg-yellow-400 p-1 font-semibold text-sm">Genres</p>
          <p>{getGenreNames(movie.genre_ids)}</p>  <!-- Tampilkan genre berdasarkan genre_ids -->
        </div>
        <p><strong>Release Date:</strong> {movie.release_date || 'Unknown'}</p>
        <p><strong>Overview:</strong> {movie.overview || 'No overview available'}</p>
        <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded" on:click={close}>Close</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-content {
    max-width: 500px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
  }
</style>
