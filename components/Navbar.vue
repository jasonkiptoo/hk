<template>
  <!-- <nav class="bg-white border-b shadow-sm">
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center">
        <button class="md:hidden" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      
        <div class="flex items-center">
          <NuxtLink to="/">
            <img src="https://hikvisionshopkenya.co.ke/wp-content/uploads/2021/06/Hikvision-Shop-Kenya.jpg"
              alt="Hikvision Logo" class="w-28 md:w-40 lg:w-48 object-contain" />
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-4 md:space-x-6">
        
          <button class="hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
          </button>

          <button class="hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-shopping-cart">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </button>
          <NuxtLink to="/profile" class="hover:text-gray-700">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-user">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </NuxtLink>
        </div>
      </div>
      <ul v-if="menuOpen" class="mt-4 space-y-2 text-lg font-medium md:hidden">
        <li>
          <NuxtLink to="/" class="block py-2 px-4 hover:text-gray-700">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="block py-2 px-4 hover:text-gray-700">Contact</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" class="block py-2 px-4 hover:text-gray-700">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/auth" class="block py-2 px-4 hover:text-gray-700">Sign Up</NuxtLink>
        </li>
      </ul>

    </div>
  </nav> -->
  <header class="bg-white">
    <div class="container mx-auto px-4 py-8 flex items-center">
      <!-- logo -->
      <div class="mr-auto md:w-48 flex-shrink-0">
        <NuxtLink to="/">
          <!-- src="@/assets/images/logoo.png" -->
          <img src="@/assets/images/logo.png" alt="Hikvision Logo" class="w-28 md:w-48 lg:w-36 object-contain" />
        </NuxtLink>
      </div>

      <!-- <ul class="mt-4 space-y-2 text-lg font-medium">
        <li>
          <NuxtLink to="/" class="block py-2 px-4 hover:text-gray-700">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="block py-2 px-4 hover:text-gray-700">Contact</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" class="block py-2 px-4 hover:text-gray-700">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/auth" class="block py-2 px-4 hover:text-gray-700">Sign Up</NuxtLink>
        </li>
      </ul> -->
      <!-- search -->
      <div class="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden xl:flex items-center">
        <!-- Dropdown for categories -->
        <select v-model="selectedCategory" @change="fetchProducts"
          class="bg-transparent uppercase font-bold text-sm p-4 mr-4">
          <option value="" disabled selected>All</option>
          <option v-for="(category, index) in categories" :key="index" :value="category.id">
            {{ category.name }}
          </option>
        </select>

        <!-- Search input field -->
        <input v-model="searchTerm" @input="fetchProducts"
          class="border-l border-gray-300 bg-transparent font-semibold text-sm pl-4" type="text"
          placeholder="I'm searching for ..." />
        <svg class="ml-auto h-5 px-4 text-gray-500" aria-hidden="true" focusable="false" data-prefix="far"
          data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor"
            d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z" />
        </svg>
      </div>

      <!-- phone number -->
      <div class="ml-auto md:w-48 hidden sm:flex flex-col place-items-end mr-2">
        <!-- <span class="font-bold md:text-xl">+254 712 234 456 78</span>
        <span class="font-semibold text-sm text-gray-400">Support 24/7</span> -->
      </div>

      <!-- buttons -->
      <nav class="contents">
        <ul class="ml-4 xl:w-48 flex items-center justify-end">
          <li class="ml-2 lg:ml-4 relative inline-block cursor-pointer">
            <NuxtLink :to="'/profile'" class="block py-2 px-4 hover:text-gray-700">
              <svg class="h-9 lg:h-10 p-2 text-gray-500" aria-hidden="true" focusable="false" data-prefix="far"
                data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor"
                  d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z">
                </path>
              </svg>
            </NuxtLink>
          </li>

          <li class="ml-2 lg:ml-4 relative inline-block cursor-pointer">
            <NuxtLink @click="goToWishList">
              <div class="absolute -top-1 right-0 z-10 bg-primary text-white text-xs font-bold px-1 py-0.5 rounded-sm">
                {{ wishListCount }}
              </div>
              <svg class="h-9 lg:h-10 p-2 text-gray-500" aria-hidden="true" focusable="false" data-prefix="far"
                data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z">
                </path>
              </svg>
            </NuxtLink>
          </li>
          <li class="ml-2 lg:ml-4 relative inline-block cursor-pointer">
            <NuxtLink to="/cart" class="block py-2 px-4 hover:text-gray-700">
              <div class="absolute -top-1 right-0 z-10 bg-primary text-white text-xs font-bold px-1 py-0.5 rounded-sm">
                {{ cartCount }}
              </div>
              <svg class="h-9 lg:h-10 p-2 text-gray-500" aria-hidden="true" focusable="false" data-prefix="far"
                data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path fill="currentColor"
                  d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z">
                </path>
              </svg>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- cart count -->
      <div class="ml-4 hidden sm:flex flex-col font-bold">
        <span class="text-xs text-gray-400">Your Cart</span>
        <span>KES {{ formattedPrice(cartTotal) }}</span>
        <!-- <button @click="updateLocation">{{ location }}</button> -->
      </div>
    </div>

    <hr />
  </header>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useNuxtApp } from "nuxt/app";
import { useUserStore } from "@/stores/auth";
// import { useProductStore } from "@/stores/auth";
import { useProductStore } from "@/stores/productStore";


// Define props
const props = defineProps({
  // refresh: {
  //   type: Boolean,
  //   default: false,
  // },
});

// watch(
//   () => props.refresh,
//   (newVal) => {
//     if (newVal) {
//       console.log("Navbar refreshed");
//       // Add logic to refresh data or update the UI
//     }
//   }
// );
const productStore = useProductStore()

const userStore = useUserStore();
const searchTerm = ref(""); // Stores the search term
const selectedCategory = ref("");
const menuOpen = ref(false);
const categories = ref([]);
const cartCount = computed(() => productStore.cartCount);
const cartTotal = computed(() => productStore.cartTotal);

// Reactive wishlist count using computed
const wishListCount = computed(() => productStore.wishListCount);
const router = useRouter();
const { $formatPrice } = useNuxtApp()

const fetchCat = async () => {
  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.get("/product/categories");
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
const formattedPrice = (price) => {
  return $formatPrice(price)
}
const cartItems = ref(0);

const routeTo = () => {
  // const userStore = useUserStore();
};

const emit = defineEmits(["update:searchTerm"]);

const fetchProducts = async () => {
  emit("update:searchTerm", searchTerm.value);

  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.get("/product", {
      params: {
        searchTerm: searchTerm.value,
        // categoryId: selectedCategory.value,
      },
    });

    console.log("Products:", response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const getCartItems = async () => {
  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.get(`/product/cart`);
    // cartCount.value = response.data.length;
    // Calculate cart total
    const defaultPrice = 100;
    cartItems.value = response.data.reduce((total, item) => {
      return total + item.quantity * defaultPrice;
    }, 0);
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};

// check if user is logged in
const checkUserLoggedIn = async () => {
  // Check if the user is logged in by verifying if the token exists
  if (userStore.isLoggedIn) {
    if (typeof window !== "undefined") {
      const storedWishlist = localStorage.getItem("wishlist");

      // Ensure storedWishlist is parsed safely
      const wishId = storedWishlist ? JSON.parse(storedWishlist) : [];

      console.log("Wishlist IDs:", wishId);

      // Ensure wishId is an array and has a length
      if (Array.isArray(wishId) && wishId.length > 0) {
        for (let i = 0; i < wishId.length; i++) {
          // wishProduct(wishId[i]); // Call wishProduct with each ID
        }
        localStorage.removeItem("wishlist"); // Clear wishlist from localStorage
      } else {
        console.log("Wishlist is empty or invalid.");
      }

      return true;
    } else {
      console.error("LocalStorage is not available in the current context.");
      return false;
    }
  } else {
    console.log("No token found. User is not logged in.");
    return false;
  }
};
const goToWishList = () => {
  router.push({
    path: `/wishlist`, // Corrected the route as the product ID was unused
  });
};

const getWishList = async () => {
  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.get("/product/wishlist");
    // wishListCount.value = response.data.length;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishListCount.value = localWishlist.length;
  }
};
const wishProduct = async productId => {
  try {
    const { $axios } = useNuxtApp();
    const product = { productId: productId };
    const response = await $axios.post(`/product/wishlist/add`, product);

    console.log("Done", response);
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
  }
};
// Fetch the data on component mount
onMounted(async () => {
  await productStore.getCartItems();
  await productStore.getWishList();
  await checkUserLoggedIn();
  await getCartItems();
  await getWishList();
  await fetchCat();
});
</script>


<style>
@media (min-width: 768px) {
  .md\:hidden {
    display: none;
  }

  .md\:flex {
    display: flex;
  }
}
</style>
