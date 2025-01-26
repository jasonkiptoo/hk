import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Holds user data
    token: null, // Holds the authentication token
  }),

  actions: {
    async login(email, password) {
      try {
        const { $axios } = useNuxtApp();

        const response = await $axios.post("/user/login", { email, password });

        console.log(response)
        const { accessToken, user } = response.data;

        if (accessToken && user) {
          this.user = user;
          this.token = accessToken;
          // console.log(token,"token")

          return { accessToken, user };
        } else {
          throw new Error("Invalid login credentials.");
        }
      } catch (error) {
        throw new Error(error.response?.data?.error?.message || "Login failed.");
      }
    },

    async register({ email, password, phoneNumber, lastName, firstName, roleId }) {
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
        throw new Error(error.response?.data?.error?.message || "Registration failed.");
      }
    },
    async verifyOtp({ email, otp, }) {
      try {
        const { $axios } = useNuxtApp();
        const userData = {
          email, otp
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

      // Clear localStorage or any persistent storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }

      // Optional: Navigate to the auth page
      const { $router } = useNuxtApp();
      if ($router) {
        $router.push('/auth');
      }
    },
  },

  getters: {
    isLoggedIn: (state) => state.token !== null,
  },

  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
});
