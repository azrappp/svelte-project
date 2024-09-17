<script>
    export let brandName = 'WatchMovie'; // Opsional, bisa menerima brand name jika mau dinamis
  </script>
  
  <nav class="font-sans flex flex-row border-b border-black border-opacity-10 bg-white backdrop-blur-lg bg-opacity-10 w-full px-28 py-4 items-center justify-between">
    <div class="text-black font-bold">{brandName}</div>
    <div class="flex flex-row gap-x-4">
      <a href="/movie" class="text-black font-normal font-san text-sm">Movie</a>
      <a href="/tvseries" class="text-black font-normal font-sans text-sm">Tv Series</a>
      <a href="/anime" class="text-black font-normal font-sans text-sm">Anime</a>
      <a href="/friend" class="text-black font-normal font-sans text-sm">Friends</a>
    </div>
  </nav>
  