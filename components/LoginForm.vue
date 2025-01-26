<template>
  <div class="w-full mx-auto h-screen flex items-center">
    <div class="flex flex-wrap w-full mt-28">
      <div class="hidden md:flex w-full md:w-1/2 items-center justify- mb-4 md:mb-0 image_cont">
        <img src="@/assets/images/login.png" alt="Login" class="h-full" />
      </div>
      <div class="w-full md:w-1/2" style="
          height: 100vh;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
        ">
        <div>
          <h2 class="text-5xl font-semibold mt-4 mb-8 text-left">
            Log in to your account
          </h2>
          <div v-if="!isVerified">
            <p class="text-gray-500 text-2xl mb-10 text-left">
              Enter your login details below
            </p>
            <form @submit.prevent="login" class="w-full">
              <input type="email" placeholder="Email or Phone Number"
                class="md:w-full sm:w-full w-full border-b p-2 mb-4 focus:outline-none focus:border-red-500"
                v-model="form.email" />
              <input type="password" placeholder="Password"
                class="w-full border-b p-2 mb-4 focus:outline-none focus:border-red-500" v-model="form.password" />
              <button type="submit" class="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 mt-12">
                Log In
              </button>
            </form>

            <!-- <button
              type="button"
              class="w-1/2 mt-4 border py-2 rounded flex justify-center items-center"
            >
              <img
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="Google"
                class="w-5 h-5 mr-2"
              />
              Log in with Google
            </button> -->
            <p class="text-sm mt-4 text-center">
              Don't have an account?
              <span class="text-blue-500 cursor-pointer" @click="$emit('toggle')">
                Sign up
              </span>
            </p>
          </div>
          <div v-else>
            <h3 class="text-3xl font-medium mb-4">Verify OTP</h3>
            <p class="text-gray-500 mb-6">
              Enter the OTP sent to your email address. <span class="font-weight-bold" style="font-weight: bold;">{{
                form.email }} </span>
            </p>
            <div class="w-full mb-4">
              <InputOtp :length="6" mask="*" v-model="otp" class="p-inputtex w-full text-center p-3"
                placeholder="Enter OTP" />
            </div>
            <button @click="verifyOtp" class="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600">
              Verify OTP
            </button>
          </div>
        </div>
      </div>
      <Toast position="bottom-right" group="br" />
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/auth"; // Import the Pinia store
// import { useToast } from "primevue/usetoast";
// const toast = useToast();
import Toast from 'primevue/toast';




export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        role: "",
      },
      userStore: useUserStore,
      isVerified: false
    };
  },
  methods: {
    async verifyOtp() {
      try {
        const { $axios } = useNuxtApp();
        const userStore = useUserStore();
        const { accessToken, user } = await userStore.verifyOtp(
          { email: this.form.email, otp: this.otp }
        );
        if (accessToken) {
          this.$router.push("/dashboard"); // Navigate to the dashboard upon success
        }
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: error.message,
          group: "br",
          life: 3000,
        });
      }
    },
    show() {
      this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
    },
    async login() {
      const userStore = useUserStore();
      try {
        const { accessToken, user } = await userStore.login(
          this.form.email,
          this.form.password
        );
        if (accessToken) {
          this.$router.push("/dashboard"); // Navigate to the dashboard upon success
        }
      } catch (error) {
        console.log("Vfvs", error)
        // this.isVerified = true;
        this.$toast.add({
          severity: "error",
          summary: error.message,
          group: "br",
          life: 3000,
        });

      }
    },
  },
};
</script>
<style scoped>
.image_cont {}
</style>
