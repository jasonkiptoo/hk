<template>
  <div class="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200 cursor-pointer">
    <div class="relative">
      <img :src="item.image" alt="Product Image" class="w-full h-40 object-cover rounded" />
      <button class="absolute top-2 right-2" :class="isInWishlist(item.id)
        ? 'text-red-500'
        : 'text-gray-500 hover:text-red-500'
        " @click="wishProduct(item.id)">
        <svg xmlns="http://www.w3.org/2000/svg" :fill="isInWishlist(item.id) ? 'currentColor' : 'none'"
          viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 20.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>
    </div>
    <div class="mt-4" @click="goToProductPage(item)">
      <h3 class="font-bold text-lg">{{ item.name }}</h3>
      <div class="flex items-center space-x-2 mt-2">
        <p class="text-red-500 font-bold">KES {{ formattedPrice(item.defaultPrice) }}</p>
        <!-- <p class="text-gray-400 line-through">${{ item.originalPrice }}</p> -->
      </div>
      <div class="p-4">
        <!-- <div class="mb-4 font-medium">{{ slotProps.data.name }}</div> -->
        <div class="flex justify-betweenitems-center">
          <div class="mt-0 font-semibold text-xl">
            <!-- {{ slotProps.data.price }} -->
          </div>
          <span>
            <!-- <Button icon="pi pi-heart" severity="secondary" outlined /> -->
            <Button icon="pi pi-shopping-cart" class="ml-2" />
          </span>
        </div>
      </div>
      <div class="flex items-center mt-2">
        <div class="flex text-yellow-400">
          <template v-for="i in 5" :key="i">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="none"
              class="w-4 h-4">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </template>
        </div>
        <p class="ml-2 text-gray-500 text-sm">({{ item.reviews }} reviews)</p>
      </div>
    </div>
    <Toast position="bottom-right" group="br" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useNuxtApp } from "nuxt/app";
import { useUserStore } from "@/stores/auth";
import { useProductStore } from '@/stores/productStore';

const toast = useToast();
const router = useRouter();
const userStore = useUserStore();
const { $axios } = useNuxtApp();
const { $formatPrice } = useNuxtApp()

const productStore = useProductStore()

defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const formattedPrice = (price) => {
  return $formatPrice(price)
}
const emit = defineEmits(["wishlist-updated"]);

// defineEmits(["wishlist-updated"]);

const wishList = ref([]); // Initialize wishlist as a reactive array

// const location = ref('North Pole')

// function updateLocation() {
//   location.value = 'South Pole'
// }

// provide('location', {
//   location,
//   updateLocation
// })

const getWishList = async () => {
  try {
    const isLoggedIn = await checkUserLoggedIn();
    if (isLoggedIn) {
      const response = await $axios.get("/product/wishlist");
      wishList.value = response.data.map(item => item.productId); // Extract only product IDs
    } else {
      const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishList.value = localWishlist;
    }
  } catch (error) {
    // console.error("Error fetching wishlist:", error);
  }
};

// Helper function to check if the user is logged in
const checkUserLoggedIn = async () => {
  if (userStore.isLoggedIn) {
    return true;
  } else {
    return false;
  }
};

function isInWishlist(productId) {
  return wishList.value.includes(productId);
}


const wishProduct = async (productId) => {
  const productStore = useProductStore(); // Access the store
  // const userStore = useProductStore(); // Access the store
  try {
    // Check if the user is logged in or not
    // const isLoggedIn = /* check if the user is logged in (for example, check token or auth state) */;

    // If the user is logged in
    if (userStore.isLoggedIn) {

      // if (isLoggedIn) {
      // Check if the product is already in the wishlist
      // if (!productStore.wishListItems.some(item => item.id === productId)) {
      await productStore.addToWishlist(productId);  // Add product to wishlist
      // } else {
      //   // Remove product from wishlist if already in the list (optional behavior)
      //   await productStore.removeFromWishlist(productId);
      // }

      // Update wishlist data from the store
      await productStore.getWishList();
    } else {
      // If the user is not logged in, save wishlist to localStorage
      const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      // If the product is not in the local wishlist, add it
      if (!localWishlist.some(item => item.id === productId)) {
        localWishlist.push({ id: productId });
        localStorage.setItem("wishlist", JSON.stringify(localWishlist));

        // Show toast message for saving locally
        toast.add({
          severity: "success",
          summary: "Your Wishlist has been saved locally.",
          group: "br",
          life: 3000,
        });
      } else {
        // Show message if the item is already in the local wishlist
        toast.add({
          severity: "info",
          summary: "This product is already in your local wishlist.",
          group: "br",
          life: 3000,
        });
      }
    }
  } catch (error) {
    console.error("Error processing wishlist:", error);

    // Show error message
    toast.add({
      severity: "error",
      summary: "An error occurred while managing your wishlist.",
      detail: error.message,
      group: "br",
      life: 5000,
    });
  }
};



const goToProductPage = product => {
  router.push({
    path: `/products/${product.id}`,
  });
};

// Fetch the wishlist when the component is mounted
onMounted(() => {
  getWishList();
  checkUserLoggedIn();
});
</script>

<style scoped></style>
