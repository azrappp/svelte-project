import { writable } from "svelte/store";

export const popularMovies = writable([]);
export const homeMovies = writable([]);
export const topRatedMovies = writable([]);
export const genres = writable([]);
export const activeMovieIndex = writable(0);
