<!-- MovieCard.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    export let movie;
  
    const dispatch = createEventDispatcher();

    function getFontSize(title) {
    if (title.length > 20) return "text-base";
    if (title.length > 10) return "text-lg";
    return "text-xl";
    }

    function handleClick() {
      console.log("MODAL OPEN")
      dispatch('openModal', movie);
    }
  
    function handleKeyDown(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        handleClick();
      }
    }
  </script>
  
  <div class="relative h-[367px] w-60 flex-shrink-0 flex items-end justify-start text-left bg-cover bg-center rounded-2xl cursor-pointer"
       style="background-image: url('https://image.tmdb.org/t/p/w500{movie.poster_path}');"
       on:click={handleClick}
       on:keydown={handleKeyDown}
       role="button"
       tabindex="0"
       aria-label={`View details for ${movie.title}`}>
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
  