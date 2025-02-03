<template>
  <div class="p-6 container mx-auto">
    <h2 class="text-2xl font-bold mb-4">Wishlist ({{ wishlist.length }})</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-6">
      <div v-for="(item, index) in wishlist" :key="index" class="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div class="relative">
          <!-- Check for the primary image and render it -->
          <img :src="item.productModel.images.find(image => image.isPrimary)?.optimizeUrl" :alt="item.productModel.name"
            class="w-full h-40 object-cover" />
          <span v-if="item.discount" class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{{ item.discount }}%
          </span>
          <button class="absolute top-2 right-2 bg-gray-100 text-gray-500 rounded-full p-1 hover:text-red-500"
            @click="removeFromWishlist(index)">
            <i class="pi pi-trash"></i>
          </button>
        </div>

        <div class="p-4">
          <h3 class="text-lg font-semibold">{{ item.productModel.name.slice(0, 15) }}</h3>
          <p class="text-gray-500 mb-2">
            <span class="text-red-500 font-bold">KES {{ formattedPrice(item.productModel.price) }}</span>
            <span v-if="item.originalPrice" class="line-through text-sm ml-2 text-gray-400">
              ${{ item.originalPrice }}
            </span>
          </p>
          <button class="w-full bg-black text-white py-2 rounded hover:bg-gray-800" @click="addToCart(item)">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
    <div>
      <!-- <button class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" @click="moveAllToCart">
        Move All To Bag
      </button> -->
    </div>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import { useUserStore } from "@/stores/auth";
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
    formattedPrice(price) {
      const { $formatPrice } = useNuxtApp();
      return $formatPrice(price);
    },
    removeFromWishlist(index) {
      this.wishlist.splice(index, 1);
    },
    async addToCart(product) {
      console.log("cdscs", product);
      const userStore = useUserStore();

      let user = userStore.user;
      try {
        const productStore = useProductStore(); // Access the store
        const { response } = await productStore.addToCart(
          product.productModelId,
          1,
          user.id
        );

        // Notify user on successful addition
        toast.add({
          severity: "success",
          summary: "Product Added to Cart",
          group: "br",
          life: 3000,
        });

        console.log(response);
      } catch (error) {
        // Handle errors and show appropriate toast messages
        toast.add({
          severity: "error",
          summary: "Failed to Add Product",
          detail: error.message,
          group: "br",
          life: 5000,
        });
      }
      // alert(`Added ${item.name} to the cart!`);
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
