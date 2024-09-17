<script>
  import { onMount, onDestroy } from 'svelte';
  import { getPopularMovies, getTopRatedMovies, getGenres } from '../services/movieService.js';
  import PopularMovies from '../components/PopularMovies.svelte';
  import BestMovie from '../components/BestMovie.svelte';
  import HeroSection from '../components/HeroSection.svelte';
  import Navbar from '../components/Navbar.svelte';

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
      genres = await getGenres();
      popularMovies = await getPopularMovies();
      homeMovies = popularMovies.slice(0, 4);
      topRatedMovies = await getTopRatedMovies();
    } catch (err) {
      if (popularMovies.length === 0) errorPopular = err.message;
      if (topRatedMovies.length === 0) errorTopRated = err.message;
      if (genres.length === 0) errorGenres = err.message;
    }
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  const setActiveMovie = (index) => {
    activeMovieIndex = index;
  };

  const getGenreNames = (genreIds) => {
    return genreIds.map(id => {
      const genre = genres.find(g => g.id === id);
      return genre ? genre.name : 'Unknown';
    }).join(' / ');
  };
</script>


<Navbar brandName="WatchMovie" />

<main class="mx-16 md:mx-32 lg:mx-36 pt-6 items-center">
  <HeroSection 
    {homeMovies}
    {activeMovieIndex}
    {setActiveMovie}
    {errorPopular}
    {getGenreNames}
  />

  <PopularMovies {popularMovies} {errorPopular}/>
 
  <!-- Movies Section -->
  <BestMovie {topRatedMovies} {errorTopRated}/>

</main>
