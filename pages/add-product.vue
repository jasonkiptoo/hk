<template>
  <div class="max-w-4xl mx-auto py-10">
    <h1 class="text-2xl font-bold mb-6">Add Product</h1>
    <form @submit.prevent="addProduct">
      <!-- Product Name -->
      <div class="mb-4">
        <label for="productName" class="block text-sm font-medium mb-2">Product Name</label>
        <input
          id="productName"
          type="text"
          v-model="product.name"
          class="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter product name"
          required
        />
      </div>

      <!-- Description -->
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium mb-2">Description</label>
        <textarea
          id="description"
          v-model="product.description"
          class="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter product description"
          rows="4"
          required
        ></textarea>
      </div>

      <!-- Category -->
      <div class="mb-4">
        <label for="category" class="block text-sm font-medium mb-2">Category</label>
        <select
          id="category"
          v-model="product.category"
          class="w-full border border-gray-300 p-2 rounded"
          required
        >
          <option value="" disabled>Select a category</option>
          <option>HD ANALOGUE CAMERAS AND DVR</option>
          <option>IP NETWORK CAMERAS AND NVR</option>
          <option>ACCESS CONTROL PRODUCTS</option>
          <option>VIDEO INTERCOM PRODUCTS</option>
          <option>MONITOR DISPLAY PRODUCTS</option>
          <option>ACCESSORIES PRODUCTS</option>
        </select>
      </div>

      <!-- Image Upload -->
      <div class="mb-4">
        <label for="image" class="block text-sm font-medium mb-2">Upload Image</label>
        <input
          id="image"
          type="file"
          @change="onImageUpload"
          class="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <!-- Quantity -->
      <div class="mb-4">
        <label for="quantity" class="block text-sm font-medium mb-2">Quantity</label>
        <input
          id="quantity"
          type="number"
          v-model="product.quantity"
          class="w-full border border-gray-300 p-2 rounded"
          placeholder="Enter quantity"
          required
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Product
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: '',
        description: '',
        category: '',
        image: null,
        quantity: null,
      },
    };
  },
  methods: {
    onImageUpload(event) {
      this.product.image = event.target.files[0];
    },
    addProduct() {
      // Prepare the data to be sent
      const formData = new FormData();
      formData.append('name', this.product.name);
      formData.append('description', this.product.description);
      formData.append('category', this.product.category);
      formData.append('image', this.product.image);
      formData.append('quantity', this.product.quantity);

      // Simulate API call
      console.log('Product added:', this.product);

      // Reset the form
      this.product = {
        name: '',
        description: '',
        category: '',
        image: null,
        quantity: null,
      };
      alert('Product successfully added!');
    },
  },
};
</script>

<style scoped>
/* Add custom styles as needed */
</style>
