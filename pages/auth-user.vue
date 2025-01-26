<template>
  <div>TEset page</div>
</template>

<!-- <script lang="js" setup>






definePageMeta({
  middleware: defineNuxtRouteMiddleware((to, from) => {
    console.log('to', to);
    console.log('from', from);
  }),
});
</script> -->
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
});
</script>

<style></style>
