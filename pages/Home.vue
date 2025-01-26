<template>
    <div class="container mx-auto my-10">
      <section class="wishlist mb-10">
        <h2 class="text-xl font-bold">Wishlist (4)</h2>
        <div class="grid grid-cols-4 gap-4">
          <!-- Sample Product -->
          <div class="border p-4">
            <!-- <img src="path-to-image" alt="Gucci Bag" class="w-full mb-4" /> -->
            <p class="font-bold">Gucci Duffle Bag</p>
            <p class="text-red-500">$900</p>
            <button class="bg-black text-white w-full py-2">Add to Cart</button>
          </div>
          <!-- Add more products as per your requirement -->
        </div>
      </section>
      <section class="just-for-you">
        <h2 class="text-xl font-bold mb-4">Just For You</h2>
        <div class="grid grid-cols-6 gap-4">
          <!-- Sample Product -->
          <div class="border p-4">
            <!-- <img src="path-to-image" alt="ASUS Gaming Laptop" class="w-full mb-4" /> -->
            <p class="font-bold">ASUS FHD Gaming Laptop</p>
            <p class="text-red-500">$950</p>
            <button class="bg-black text-white w-full py-2">Add to Cart</button>
          </div>
          <!-- Add more products as per your requirement -->
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "Home",
  };
  </script>
  
  <style scoped>
  .wishlist h2 {
    color: #333;
  }
  </style>
  