<template>
  <div class="container mx-auto my-10">
    <div class="breadcrumb text-sm mb-4 card">
      <div class="card flex">
        <Breadcrumb :home="home" :model="items">
          <template #item="{ item, props }">
            <router-link
              v-if="item.route"
              v-slot="{ href, navigate }"
              :to="item.route"
              custom
            >
              <a :href="href" v-bind="props.action" @click="navigate">
                <span :class="[item.icon, 'text-color']" />
                <span class="text-primary font-semibold">{{ item.label }}</span>
              </a>
            </router-link>
            <a
              v-else
              :href="item.url"
              :target="item.target"
              v-bind="props.action"
            >
              <span class="text-surface-700 dark:text-surface-0">{{
                item.label
              }}</span>
            </a>
          </template>
        </Breadcrumb>
      </div>
    </div>
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-1/4">
        <ul class="space-y-2 text-gray-600 pt-2">
          <li class="font-bold text-red-500">Manage My Account</li>
          <li @click="activeSection = 'profile'" class="cursor-pointer">
            Profile
          </li>
          <li @click="activeSection = 'paymentOptions'" class="cursor-pointer">
            Payment Options
          </li>
          <li
            @click="activeSection = 'orders'"
            class="font-bold text-red-500 mt-4 cursor-pointer"
          >
            My Orders
          </li>
          <li
            @click="activeSection = 'wishlist'"
            class="font-bold text-red-500 mt-4 cursor-pointer"
          >
            My Wishlist
          </li>
        </ul>
        <button
          @click="logout"
          class="bg-red-500 text-white px-4 py-2 rounded mt-12"
        >
          Logout
        </button>
      </aside>

      <!-- Main Content Section -->
      <main class="w-3/4 bg-white border">
        <!-- Profile Section -->
        <div v-if="activeSection === 'profile'" class="p-3">
          <h2 class="text-xl font-bold mb-4 text-red-500">Edit Your Profile</h2>
          <form>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  v-model="user.firstName"
                  class="border w-full p-2 mt-1"
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  v-model="user.lastName"
                  class="border w-full p-2 mt-1"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  class="border w-full p-2 mt-1"
                />
              </div>
            </div>
            <h3 class="mt-6 font-bold">Password Changes</h3>
            <div class="grid grid-cols-1 gap-4 mt-2">
              <input
                type="password"
                placeholder="Current Password"
                class="border w-full p-2"
              />
              <input
                type="password"
                placeholder="New Password"
                class="border w-full p-2"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                class="border w-full p-2"
              />
            </div>
            <div class="flex justify-between mt-6">
              <button class="border px-4 py-2">Cancel</button>
              <button class="bg-red-500 text-white px-4 py-2">
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <!-- Payment Options Section -->
        <div v-if="activeSection === 'paymentOptions'" class="p-4">
          <h2 class="text-xl font-bold mb-4 text-red-500">Payment Method</h2>
          <!-- <p>Select your preferred payment method:</p> -->
          <div class="mt-4">
            <h3 class="font-bold mb-2">Mpesa</h3>
            <p class="text-gray-600">Mobile Number: {{ user.phoneNumber }}</p>
          </div>
        </div>

        <!-- Orders Section -->
        <div v-if="activeSection === 'orders'">
          <h2 class="text-xl font-bold mb-4 text-red-500">My Orders</h2>
          <table
            class="table-auto w-full border-collapse border border-gray-200"
          >
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 px-4 py-2 text-left">
                  Order #
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th class="border border-gray-300 px-4 py-2 text-left">
                  Status
                </th>
                <th class="border border-gray-300 px-4 py-2 text-left">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(order, index) in orders"
                :key="index"
                class="hover:bg-gray-50"
              >
                <td class="border border-gray-300 px-4 py-2">{{ order.id }}</td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ order.date }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ order.status }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ order.total }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Wishlist Section -->
        <div v-if="activeSection === 'wishlist'" class="p-3">
          <h2 class="text-xl font-bold mb-4 text-red-500">My Wishlist</h2>
          <div class="grid grid-cols-4 gap-4">
            <div
              v-for="(item, index) in wishlist"
              :key="index"
              class="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                :src="item.image"
                alt="Wishlist Item"
                class="w-full h-40 object-cover rounded"
              />
              <h3 class="mt-2 text-sm font-semibold">
                {{ item.product.name }}
              </h3>
              <p class="text-gray-500 text-xs">{{ item.description }}</p>
              <div class="flex gap-1">
                <button
                  :loading="loadingAdd"
                  @click="addToCart(item.id)"
                  class="bg-red-500 text-white px-3 py-1 mt-2 rounded text-sm w-3/4"
                >
                  Add to Cart
                </button>
                <button
                  :loading="removeItem"
                  @click="removeWish(item.id)"
                  class="bg-black text-white px-3 py-1 mt-2 rounded text-sm w-1/4"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/auth";
definePageMeta({
  middleware: ["auth"],
});
export default {
  data() {
    return {
      removeItem: false,
      loadingAdd: false,
      home: {
        icon: "pi pi-home",
        // icon: "pi pi-user",
      },
      items: [
        { label: "Home", route: "/" },
        { label: "My Account", route: "/profile" },
      ],
      activeSection: "profile", // Default section to display
      user: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        createdAt: "",
      },
      orders: [
        { id: 1, date: "2024-01-01", status: "Delivered", total: "Kes. 100" },
        { id: 2, date: "2024-02-15", status: "Pending", total: "Kes. 200" },
        { id: 3, date: "2024-03-05", status: "Cancelled", total: "Kes. 150" },
      ],
      wishlist: [],
    };
  },

  async mounted() {
    await this.getUserData();
    await this.getWishList();
    // Example: Initialize user data from localStorage (if needed)
    // if (process.client) {
    //   const userData = JSON.parse(localStorage.getItem("userData"));
    //   if (userData) {
    //     this.user.firstName = userData.firstName || "";
    //     this.user.lastName = userData.lastName || "";
    //     this.user.email = userData.email || "";
    //     this.user.phoneNumber = userData.phoneNumber || "";
    //     this.user.address = userData.address || "";
    //     this.user.createdAt = userData.createdAt || "";
    //   }
    // }
  },

  methods: {
    async removeWish(id) {
      const { $axios } = useNuxtApp();
      this.removeItem = true;
      // setTimeout(() => {
      //   this.loadingAdd = false;
      // }, 2000);
      try {
        const response = await $axios.post(
          `/product/wishlist/remove/${productID}`
        );
        this.removeItem = false;
      } catch (error) {
        this.removeItem = false;
      }
    },
    async addToCart(productID) {
      console.log("addToCart");
      const { $axios } = useNuxtApp();
      this.loadingAdd = true;
      setTimeout(() => {
        this.loadingAdd = false;
      }, 2000);
      try {
        const body = {
          productId: productID,
          quantity: 1,
        };
        const response = await $axios.post(`/product/cart/add`, body);
        this.loadingAdd = false;
      } catch (error) {
        this.loadingAdd = false;
      }
    },
    async getWishList() {
      const { $axios } = useNuxtApp();
      try {
        const response = await $axios.get("/product/wishlist");
        this.wishlist = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getUserData() {
      const userStore = useUserStore();

      this.user = userStore.user;
      // console.log(this.userData, "userData");
    },
    logout() {
      const userStore = useUserStore(); // Access the store
      userStore.logout(); // Call the logout action
      // Clear user data and navigate to the auth page
      // localStorage.removeItem("user");
      // localStorage.removeItem("token");
      // this.$router.push("/auth");
    },
  },
};
</script>
