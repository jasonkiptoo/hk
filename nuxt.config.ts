import Aura from "@primevue/themes/aura";
import Lara from "@primevue/themes/lara";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:4500/api",
    },
  },
  css: [
    //   'primevue/resources/themes/lara-light-indigo/theme.css', // Theme CSS
    //   'primevue/resources/primevue.min.css', // Core PrimeVue styles
    "primeicons/primeicons.css", // PrimeIcons
    "@/assets/css/global.css",
  ],
  plugins: ["~/plugins/axios", "~/plugins/initializeStore", "~/plugins/currency.js"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate",
    "@primevue/nuxt-module",
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: "light",
          cssLayer: false,
        },
      },
    },
  },
  compatibilityDate: "2024-12-03",
  devtools: { enabled: true },
});
