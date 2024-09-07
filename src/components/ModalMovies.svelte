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
    console.log(movie.release_date)
  </script>
  
  {#if isOpen}
    <div class="fixed z-50  inset-0 flex items-center justify-center bg-black bg-opacity-50" on:click={close}>
      <div class="bg-white  max-w-2xl  rounded-2xl   mx-4" on:click|stopPropagation>
        <div
        class="relative h-48 md:h-64 w-full flex items-end justify-start text-left bg-cover bg-center rounded-t-2xl"
        style="background-image: url('https://image.tmdb.org/t/p/w500{movie.poster_path}');"
      >
        <div class="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900 rounded-lg"></div>
        <main class="px-5 md:px-7 pb-7 z-10 gap-y-4  flex flex-col">
          <div class="flex flex-row gap-x-1 items-end">
            <p class="text-4xl  lg:text-7xl font-bold text-white">
                {movie.title}
            </p>
            <p class="text-white  text-2xl font-normal"> {details.release_date.split('-')[0]}</p>
          </div>
          <button class="px-3  max-w-48   py-2 text-black font-semibold bg-yellow-500 text-xl rounded-md">Add to Playlist +</button>
        </main>        
      </div>
      <div class="px-4 py-2 ">
        <h2 class="text-xl font-bold mb-4">{movie.title}</h2>
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
  