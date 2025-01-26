export default defineNuxtPlugin(nuxtApp => {
    // Function to add commas as thousand separators
    const formatNumberWithCommas = (value) => {
      if (isNaN(value)) return '';
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
  
    // Provide the function globally via the `nuxtApp.provide`
    nuxtApp.provide('formatNumberWithCommas', formatNumberWithCommas);
  });
  