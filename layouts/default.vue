<template>
  <div class="sticky top-0 bg-cover bg-center h-200]" style="background-image: url('/images/bg.jpg');">
    <Navbar @update:searchTerm="handleSearchUpdate" />
    <NuxtPage :search-term="searchTerm" />
  </div>
</template>


<script>
import { ref } from "vue";
import Navbar from "~/components/Navbar.vue";
import { useUserStore } from "@/stores/auth";

export default {
  components: {
    Navbar,
  },
  setup() {
    const searchTerm = ref("");
    const userStore = useUserStore();

    // Check if the user is logged in (optional)
    // console.log("Is logged in:", userStore.isLoggedIn);

    const handleSearchUpdate = (value) => {
      searchTerm.value = value;
    };

    return { searchTerm, handleSearchUpdate };
  },
};
</script>
