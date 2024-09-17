<script>
    export let size = 50; // Ukuran spinner
    export let color = '#0F62FE'; // Warna utama spinner
  </script>
  
  <style>
    .spinner {
      border: 4px solid transparent;
      border-top-color: var(--color);
      border-radius: 50%;
      width: var(--size);
      height: var(--size);
      animation: spin 1s linear infinite;
      margin: auto;
    }
  
    .spinner::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      background: radial-gradient(circle, transparent 60%, var(--color) 60%, var(--color) 100%);
      transform: scale(0.8);
      animation: pulse 1s ease-in-out infinite alternate;
    }
  
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  
    @keyframes pulse {
      0% {
        transform: scale(0.8);
        opacity: 0.6;
      }
      100% {
        transform: scale(1.2);
        opacity: 1;
      }
    }
  </style>
  
  <div
    class="spinner"
    style="--size: {size}px; --color: {color};">
  </div>
  