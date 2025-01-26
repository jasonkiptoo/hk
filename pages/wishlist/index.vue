<template>
  <div class="p-6 container mx-auto">
    <h2 class="text-2xl font-bold mb-4">Wishlist ({{ wishlist.length }})</h2>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-6"
    >
      <div
        v-for="(item, index) in wishlist"
        :key="index"
        class="bg-white border rounded-lg shadow-sm overflow-hidden"
      >
        <div class="relative">
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-40 object-cover"
          />
          <span
            v-if="item.discount"
            class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
          >
            -{{ item.discount }}%
          </span>
          <button
            class="absolute top-2 right-2 bg-gray-100 text-gray-500 rounded-full p-1 hover:text-red-500"
            @click="removeFromWishlist(index)"
          >
            <i class="pi pi-trash"></i>
          </button>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold">{{ item.name }}</h3>
          <p class="text-gray-500 mb-2">
            <span class="text-red-500 font-bold">${{ item.price }}</span>
            <span
              v-if="item.originalPrice"
              class="line-through text-sm ml-2 text-gray-400"
            >
              ${{ item.originalPrice }}
            </span>
          </p>
          <button
            class="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            @click="addToCart(item)"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
    <div>
      <button
        class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        @click="moveAllToCart"
      >
        Move All To Bag
      </button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getWishList();
  },
  data() {
    return {
      wishlist: [],
    };
  },
  methods: {
    removeFromWishlist(index) {
      this.wishlist.splice(index, 1);
    },
    addToCart(item) {
      alert(`Added ${item.name} to the cart!`);
    },
    moveAllToCart() {
      alert("All items have been moved to the cart!");
      this.wishlist = [];
    },
    async getWishList() {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.get("/product/wishlist");
        this.wishlist = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
};
</script>

<style>
/* Optional: Tailwind custom styles can go here */
</style>
