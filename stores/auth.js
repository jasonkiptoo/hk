import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null, // Holds user data
    token: null, // Holds the authentication token
    refreshToken: null, // Holds the refresh token
  }),

  actions: {
    async login(email, password) {
      try {
        const { $axios } = useNuxtApp();

        const response = await $axios.post("/user/login", { email, password });
        const { accessToken, user, refreshToken } = response.data;

        if (accessToken && user) {
          this.user = user;
          this.token = accessToken;
          this.refreshToken = refreshToken;
          // console.log(token,"token")
          const productStore = useProductStore();
          productStore.moveWishlistToCart()

          return { accessToken, user };
        } else {
          throw new Error("Invalid login credentials.");
        }
      } catch (error) {
        throw new Error(
          error.response?.data?.error?.message || "Login failed."
        );
      }
    },

    // Function to refresh the access token using the refresh token
    async refreshAccessToken() {
      // const refreshToken = localStorage.getItem('refreshToken');
      // const userId = localStorage.getItem('userId');

      if (!refreshToken || !user) {
        console.error("No refresh token or user ID found.");
        return;
      }
      const { $axios } = useNuxtApp();

      try {
        const response = $axios.post("/auth/refresh", {
          id: user.id,
          refreshToken: refreshToken,
        });

        const { accessToken, user, refreshToken } = response.data;

        console.log(response.data);
        this.token = accessToken;
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    },

    async register({
      email,
      password,
      phoneNumber,
      lastName,
      firstName,
      roleId,
    }) {
      try {
        const { $axios } = useNuxtApp();
        const userData = {
          email,
          password,
          phoneNumber: phoneNumber || "", // Fallback to empty string if not provided
          firstName,
          lastName,
          roleId,
        };

        const response = await $axios.post("/auth/create-user", userData);

        const { accessToken, user } = response.data;
        // console.log(response.data, "resque user   ")

        return true;
      } catch (error) {
        // console.error("Registration failed:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error?.message || "Registration failed."
        );
      }
    },
    async verifyOtp({ email, otp }) {
      try {
        const { $axios } = useNuxtApp();
        const userData = {
          email,
          otp,
        };

        const response = await $axios.post("/auth/verify", userData);

        const { accessToken, user } = response.data;
        if (accessToken && user) {
          this.user = user;
          this.token = accessToken;
          return { accessToken, user };
        } else {
          throw new Error("Registration failed.");
        }
      } catch (error) {
        throw new Error(error.response?.data?.error?.message || "Invalid OTP.");
      }
    },

    logout() {
      // Clear user and token data from the store
      this.user = null;
      this.token = null;

      const userStore = useUserStore();
      const productStore = useProductStore();

      // Clear user and token data from the store
      userStore.$reset(); // Reset userStore state
      productStore.$reset(); // Reset productStore state

      // Clear localStorage or any persistent storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("product");
      }

      // Optional: Navigate to the auth page
      const { $router } = useNuxtApp();
      if ($router) {
        $router.push("/auth");
      }
    },
  },

  getters: {
    isLoggedIn: (state) => state.token !== null,
  },

  persist: {
    storage: typeof window !== "undefined" ? localStorage : undefined,
  },
});
