<template>
  <div class="w-full mx-auto h-screen flex items-center">
    <div class="flex flex-wrap w-full mt-28">
      <div
        class="hidden md:flex w-full md:w-1/2 items-center justify-center mb-4 md:mb-0 image_cont"
      >
        <img src="@/assets/images/login.png" alt="Login" class="h-full" />
      </div>
      <div
        class="w-full md:w-1/2"
        style="
          height: 100vh;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 100px;
        "
      >
        <div>
          <h2 class="text-5xl font-semibold mt-4 mb-8 text-left">
            Create an account
          </h2>
          <p class="text-gray-500 text-2xl mb-10 text-left">
            Enter your details below to sign up
          </p>
          <form v-if="!otpSent" @submit.prevent="register" class="w-full">
            <div class="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="First Name"
                class="w-full md:w-1/2 border-b p-2 focus:outline-none focus:border-red-500"
                v-model="form.firstName"
              />
              <input
                type="text"
                placeholder="Last Name"
                class="w-full md:w-1/2 border-b p-2 focus:outline-none focus:border-red-500"
                v-model="form.lastName"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              class="md:w-full sm:w-full w-full border-b p-2 mb-4 focus:outline-none focus:border-red-500"
              v-model="form.email"
            />
            <input
              type="password"
              placeholder="Password"
              class="w-full border-b p-2 mb-4 focus:outline-none focus:border-red-500"
              v-model="form.password"
            />
            <input
              type="text"
              placeholder="Phone"
              class="w-full border-b p-2 mb-4 focus:outline-none focus:border-red-500"
              v-model="form.phone"
            />

            <Select
              v-model="form.role"
              :options="roles"
              optionLabel="name"
              @change="handleRole"
              placeholder="Select a Role"
              class="w-full custom-dropdown"
            />

            <button
              type="submit"
              class="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 mt-12"
            >
              Sign Up
            </button>
          </form>

          <!-- OTP Input Section -->
          <div v-else>
            <h3 class="text-3xl font-medium mb-4">Verify OTP</h3>
            <p class="text-gray-500 mb-6">
              Enter the OTP sent to your email address.
              <span class="font-weight-bold" style="font-weight: bold"
                >{{ form.email }}
              </span>
            </p>
            <div class="w-full mb-4">
              <InputOtp
                :length="6"
                mask="*"
                v-model="otp"
                class="p-inputtex w-full text-center p-3"
                placeholder="Enter OTP"
              />
            </div>
            <button
              @click="verifyOtp"
              class="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600"
            >
              Verify OTP
            </button>
          </div>

          <p class="text-sm mt-4 text-center">
            Already have an account?
            <span class="text-blue-500 cursor-pointer" @click="$emit('toggle')">
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
    <Toast position="bottom-right" group="br" />
  </div>
</template>

<script>
import { useUserStore } from "@/stores/auth";
import InputOtp from "primevue/inputotp";
import axios from "axios";

export default {
  components: {
    InputOtp,
  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        role: "",
      },
      otp: "",
      otpSent: false,
      roles: [],
    };
  },
  methods: {
    handleRole() {
      if (this.form.role.name == "TECHNICIAN") {
        console.log("role: ", this.form.role);
        this.$emit("show-questionnaire");
      }
    },
    async register() {
      try {
        const userStore = useUserStore();
        const { $axios } = useNuxtApp();

        // Register the user
        await userStore.register({
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          password: this.form.password,
          phoneNumber: this.form.phone || "",
          roleId: this.form.role.id,
        });
        // Simulate sending OTP
        this.otpSent = true;
        console.log("OTP sent to email");
      } catch (error) {
        console.error("Error registering:", error);
        this.$toast.add({
          severity: "error",
          summary: error.message,
          group: "br",
          life: 3000,
        });
      }
    },

    async verifyOtp() {
      try {
        const { $axios } = useNuxtApp();
        const userStore = useUserStore();
        const { accessToken, user } = await userStore.verifyOtp({
          email: this.form.email,
          otp: this.otp,
        });
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
    // async verifyOtp() {
    //   try {
    //     const { $axios } = useNuxtApp();
    //     const userStore = useUserStore();

    //     // Verify OTP with backend
    //     const { accessToken, user } = await userStore.verifyOtp(
    //       { email: this.form.email, otp: this.otp }
    //     );
    //     console.log("User", user);
    //     if (accessToken) {
    //       console.log("Otp success:", user);

    //       this.$router.push("/dashboard"); // Navigate to the dashboard upon success
    //     }
    //   } catch (error) {
    //     console.error("Error verifying OTP:", error);
    //     this.$toast.add({
    //       severity: "error",
    //       summary: error.message,
    //       group: "br",
    //       life: 3000,
    //     });
    //   }
    // },

    async fetchRoles() {
      const { $axios } = useNuxtApp();
      try {
        const response = await $axios.get("/user/roles");
        this.roles = response.data;
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    },
  },
  mounted() {
    this.fetchRoles();
  },
};
</script>

<style scoped>
.image_cont {
}

.custom-dropdown .p-dropdown {
  border: none;
  border-bottom: 2px solid #d1d5db;
  border-radius: 0;
}

.custom-dropdown .p-dropdown:hover {
  border-bottom: 2px solid #ef4444;
}

.custom-dropdown .p-dropdown-focus {
  border-bottom: 2px solid #ef4444;
  box-shadow: none;
}
</style>
