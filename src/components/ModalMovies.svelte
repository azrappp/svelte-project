<script>
    export let isOpen = false;
    export let movie = {};
    export let details = {};
  
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    function close() {
      isOpen = false;
      dispatch('close');
    }
  </script>
  
  {#if isOpen}
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" on:click={close}>
      <div class="bg-white p-5 rounded-lg max-w-sm mx-4" on:click|stopPropagation>
        <h2 class="text-xl font-bold mb-4">{movie.title}</h2>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} class="mb-4"/>
        <p><strong>Release Date:</strong> {details.release_date}</p>
        <p><strong>Director:</strong> {details.director || 'Unknown'}</p>
        <p><strong>Budget:</strong> {details.budget ? `${details.budget} USD` : 'Unknown'}</p>
        <p><strong>Distributed by:</strong> {details.distributors || 'Unknown'}</p>
        <p><strong>Based on:</strong> {details.based_on || 'Unknown'}</p>
        <p><strong>Cinematography:</strong> {details.cinematography || 'Unknown'}</p>
        <p><strong>Overview:</strong> {movie.overview || 'No overview available'}</p>
        <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded" on:click={close}>Close</button>
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
  