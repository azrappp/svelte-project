<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchGenres } from '../api/api.js';
  import { createEventDispatcher } from 'svelte';
  import { quintOut } from 'svelte/easing';
  import type { TransitionConfig } from 'svelte/transition';

  // Define the Modal type here
  type ModalParams = { duration?: number };
  type Modal = (
    node: Element,
    params?: ModalParams
  ) => TransitionConfig;

  // Movie type definition
  type Movie = {
    genre_ids: number[];
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
  };

  export let isOpen = false;
  export let movie: Movie = {
    genre_ids: [],
    title: 'Unknown Title',
    release_date: 'Unknown Release Date',
    overview: 'No overview available',
    poster_path: 'default-image.jpg'
  };

  let genres: Array<{ id: number; name: string }> = [];
  const dispatch = createEventDispatcher();
  let loading = true;
  let error = '';

  const modal: Modal = (node, { duration = 300 } = {}) => {
    return {
      duration,
      easing: quintOut,
      css: (t) => `
        transform: scale(${t});
        opacity: ${t};
      `
    };
  };

  onMount(async () => {
    try {
      const dataGenres = await fetchGenres();
      genres = dataGenres.genres;
    } catch (err) {
      error = err.message;
      console.error(err.message);
    } finally {
      loading = false;
    }
  });

  const getGenreNames = (genreIds) => {
    return genreIds.map(id => {
      const genre = genres.find(g => g.id === id);
      return genre ? genre.name : 'Unknown';
    }).join(', ');
  };

  function closeModal() {
    isOpen = false;
    dispatch('close');
  }
</script>

{#if isOpen}
  <div class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50" on:click={closeModal}>
    <div
      class="modal bg-white max-w-2xl rounded-2xl mx-4"
      on:click|stopPropagation
      transition:modal={{ duration: 300 }} 
    >
      {#if loading}
        <p>Loading...</p>
      {:else if error}
        <p class="text-red-500">{error}</p>
      {:else}
        <div>
          <div
            class="relative h-48 md:h-64 w-full flex items-end justify-start text-left bg-cover bg-center rounded-t-2xl"
            style="background-image: url('https://image.tmdb.org/t/p/w500{movie.poster_path}');"
          >
            <div class="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900 rounded-lg"></div>
            <main class="px-5 md:px-7 pb-7 z-10 gap-y-4 flex flex-col">
              <div class="flex flex-row gap-x-1 items-end">
                <p class="text-4xl lg:text-7xl font-bold text-white">{movie.title}</p>
                <p class="text-white text-2xl font-normal">{movie.release_date.split('-')[0]}</p>
              </div>
              <button class="px-3 max-w-48 py-2 text-black font-semibold bg-yellow-500 text-xl rounded-md">Add to Playlist +</button>
            </main>
          </div>
          <div class="px-4 py-2">
            <div>
              <p class="text-black bg-yellow-400 p-1 font-semibold text-sm">Genres</p>
              <p>{getGenreNames(movie.genre_ids || [])}</p> 
            </div>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded" on:click={closeModal}>Close</button>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .modal {
    position: relative;
    max-height: calc(100vh - 4em);
    overflow: auto;
    background: hsl(220, 20%, 90%);
    box-shadow: 0 0 10px hsl(0, 0%, 0%, 0.1);
    border-radius: 1rem;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
</style>
