<script>
    import MovieCard from "./MovieCard.svelte";
    export let topRatedMovies = [];
    export let errorTopRated = null;
</script>

<style>
    .scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>
<div>
    <h2 class="font-bold text-black hide-scrollbar text-4xl my-5">Best Film</h2>
    <div class="container flex flex-row scrollbar-hidden hide-scrollbar overflow-x-auto gap-x-2">
        {#if errorTopRated}
          <p class="text-red-500">Error: {errorTopRated}</p>
        {:else}
          {#each topRatedMovies as movie}
            <MovieCard {movie} />
          {/each}
        {/if}
      </div> 
       
</div>

