<template>
  <div
    class="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200 cursor-pointer"
  >
    <div class="relative">
      <img
        :src="item.image"
        alt="Product Image"
        class="w-full h-40 object-cover rounded"
      />
      <button
        class="absolute top-2 right-2"
        :class="
          isInWishlist(item.id)
            ? 'text-red-500'
            : 'text-gray-500 hover:text-red-500'
        "
        @click="wishProduct(item.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :fill="isInWishlist(item.id) ? 'currentColor' : 'none'"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 20.23l8.84-8.84a5.5 5.5 0 000-7.78z"
          />
        </svg>
      </button>
    </div>
    <div class="mt-4">
      <div class="">
        <div class="flex justify-between items-center">
          <div
            class="mt-0 font-semibold text-xl"
            @click="goToProductPage(item)"
          >
            <h3 class="font-bold text-lg">{{ item.name }}</h3>
            <p class="text-red-500 font-bold space-x-2 mt-2">
              KES {{ formattedPrice(item.price) }}
            </p>
          </div>
          <span>
            <Button
              icon="pi pi-shopping-cart"
              class="ml-"
              @click="addToCart(item)"
            />
          </span>
        </div>
      </div>
      <div class="flex items-center mt-2">
        <div class="flex text-yellow-400">
          <template v-for="i in 5" :key="i">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
              class="w-4 h-4"
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
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
import { useProductStore } from "@/stores/productStore";

const toast = useToast();
const router = useRouter();
const userStore = useUserStore();
const { $axios } = useNuxtApp();
const { $formatPrice } = useNuxtApp();

const productStore = useProductStore();

defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const formattedPrice = price => {
  return $formatPrice(price);
};
const emit = defineEmits(["wishlist-updated"]);

// defineEmits(["wishlist-updated"]);
// const wishList = ref([])
const wishList = productStore.wishListItems; // Initialize wishlist as a reactive array
// const wishList = computed(() => productStore.wishListItems);
// const cartCount = computed(() => productStore.cartCount);

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
  let wish = wishList.value;
  if (Array.isArray(wish)) {
    return wishList.value.some(item => item === productId);
  }
  return false;
}

const wishProduct = async productId => {
  console.log(productId, "Attempting to add to wishlist");

  const productStore = useProductStore(); // Access the store
  const userStore = useUserStore(); // Access the user store for authentication state

  try {
    if (userStore.isLoggedIn) {
      // Logged-in user: Add to the server-side wishlist
      const { res } = await productStore.addToWishlist(productId);
      await productStore.getWishList(); // Refresh wishlist from the server

      toast.add({
        severity: "success",
        summary: res.data.message,
        group: "br",
        life: 3000,
      });
    } else {
      // Not logged in: Save to or remove from localStorage wishlist
      const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      // Check if the product is already in the local wishlist
      const existingIndex = localWishlist.findIndex(
        item => item.id === productId
      );

      if (existingIndex === -1) {
        // Product is not in the wishlist, add it
        localWishlist.push({ id: productId });
        localStorage.setItem("wishlist", JSON.stringify(localWishlist));

        toast.add({
          severity: "success",
          summary: "Your Wishlist has been saved locally.",
          group: "br",
          life: 3000,
        });
      } else {
        // Product is already in the wishlist, remove it
        localWishlist.splice(existingIndex, 1); // Remove the item from the array
        localStorage.setItem("wishlist", JSON.stringify(localWishlist));

        toast.add({
          severity: "info",
          summary: "The item has been removed from your local wishlist.",
          group: "br",
          life: 3000,
        });
      }
    }
  } catch (error) {
    console.error("Error processing wishlist:", error);

    toast.add({
      severity: "error",
      summary: "An error occurred while managing your wishlist.",
      detail: error.message,
      group: "br",
      life: 5000,
    });
  }
};

const addToCart = async product => {
  const userStore = useUserStore();

  let user = userStore.user;
  try {
    const productStore = useProductStore(); // Access the store
    const { response } = await productStore.addToCart(product.id, 1, user.id);

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
};

const goToProductPage = product => {
  console.log("prodcet", product);
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
