<template>
  <div class="product-section pt-32">
    <div class="flex justify-center items-start">
      <!-- Left Section -->
      <div class="product-details w-1/3">
        <div class="badge text-orange-500 text-sm font-semibold mb-2">
          100% Best Product
        </div>
        <h1 class="text-4xl font-bold mb-4">HD Bullet Camera </h1>
        <p class="text-gray-500 text-lg mb-6">Wide Angle </p>
        <div class="price flex items-center text-2xl font-semibold text-red-600 mb-4">
          KES 1,800.99
          <span class="line-through text-gray-400 text-lg ml-4">KES 2,860</span>
        </div>
        <div class="discount flex items-center mb-6">
          <div class="flex items-center text-lg text-orange-500 mr-4">
            <span class="text-xl font-bold">29%</span> off
          </div>
        </div>
        <div class="stock flex items-center text-sm text-gray-600 mb-6">
          <div class="w-full max-w-xs">
            <div class="relative">
              <div class="h-2 bg-gray-300 rounded">
                <div class="h-2 bg-orange-500 rounded" style="width: 65%"></div>
              </div>
            </div>
            <div class="flex justify-between text-xs mt-2">
              <span>Available: 334</span>
              <span>Stock: 180</span>
            </div>
          </div>
        </div>
        <button class="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600">
          SHOP NOW →
        </button>
      </div>
      <!-- Dynamic Image Section -->
      <div class="dynamic-image mt- flex justify-center items-center relative w-1/3">
        <img :src="selectedImage" alt="Selected Product" class="w-full h-full rounded- shadow- border-0" />
        <div class="absolute bottom-0 left-0 text-white bg-orange-500 text-sm px-3 py-1 rounded-full"
          style="transform: translate(-50%, 50%)">
          29% off
        </div>
      </div>
      <!-- Right Section -->
      <div class="w-1/3 pa-6 ma-5 pl-40 h-40 dark:border-orange-600">
        <div class="border border-red-600 dark:border-orange-600 rounded m-2 p-4">
          <!-- Static Content -->
          <div class="mb-4 font-medium text-dark-600 text-center">Top Product</div>

          <!-- Carousel for Dynamic Content -->
          <Carousel :d_circular="true" :autoplayInterval="3000" :value="products" :numVisible="1" :numScroll="1"
            orientation="horizontal" containerClass="flex items-center" :showIndicators="false" :showNavigators="false">
            <template #item="slotProps">
              <!-- Dynamic Content -->
              <div>
                <div class="mb-4">
                  <div class="relative mx-auto">
                    <img :src="slotProps.data.image" :alt="slotProps.data.name" class="object-cover rounded"
                      style="max-width: 100%;" />
                    <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)"
                      class="absolute" style="left:5px; top: 5px" />
                  </div>
                </div>

                <div class="mb-4 font-medium flex justify-around">{{ slotProps.data.name }}</div>
                <div class="flex justify-between items-center flex justify-around">
                  <div class="mt-0 font-semibold text-xl flex justify-around py-4">{{ slotProps.data.price }}</div>
                </div>

                <div class="stock flex items-center text-sm text-gray-600 mb-6 flex justify-around">
                  <div class="w-full max-w-xs">
                    <div class="relative">
                      <div class="h-2 bg-gray-300 rounded">
                        <div class="h-2 bg-orange-500 rounded" style="width: 65%"></div>
                      </div>
                      <div class="flex justify-between text-xs mt-2">
                        <span>Available: 334</span>
                        <span>Stock: 180</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Carousel>
        </div>
      </div>

    </div>



    <!-- Carousel Section -->
    <div class="carousel flex justify-center items-center mt-8 space-x-4">
      <button @click="prevImage" class="text-gray-600 hover:text-gray-800 px-3 py-2 bg-gray-100 rounded-full shadow-md">
        ←
      </button>
      <div class="flex items-center space-x-4">
        <img v-for="(image, index) in images" :key="index" :src="image" :alt="'Product ' + (index + 1)"
          @click="selectImage(image)"
          class="w-16 h-16 rounded-md border border-gray-300 cursor-pointer hover:border-orange-500"
          :class="{ 'border-orange-500': selectedImage === image }" />
      </div>
      <button @click="nextImage" class="text-gray-600 hover:text-gray-800 px-3 py-2 bg-gray-100 rounded-full shadow-md">
        →
      </button>
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: 'landing'
})
export default {
  name: "ProductSection",
  data() {
    return {
      images: [
        "https://html.themexriver.com/radios/assets/img/product/img_53.png",
        "https://html.themexriver.com/radios/assets/img/product/img_52.png",
        "https://html.themexriver.com/radios/assets/img/product/img_54.png",
      ],
      selectedImage:
        "https://html.themexriver.com/radios/assets/img/product/img_53.png", // Default image
      products: [
        {
          name: "HD Camera Bullet",
          price: "KES 3,200.00",
          originalPrice: "KES 3,500.00",
          available: 334,
          sold: 180,
          image: "https://html.themexriver.com/radios/assets/img/product/img_52.png",
        },
        {
          name: "Wireless Speaker",
          price: "KES 5,000.00",
          originalPrice: "KES 5,500.00",
          available: 120,
          sold: 45,
          image: "https://html.themexriver.com/radios/assets/img/product/img_53.png",
        },
        {
          name: "Smart Watch Pro",
          price: "KES 15,000.00",
          originalPrice: "KES 18,000.00",
          available: 80,
          sold: 25,
          image: "https://html.themexriver.com/radios/assets/img/product/img_54.png",
        },
      ],
    };
  },
  methods: {
    getSeverity(status) {
      switch (status) {
        case 'INSTOCK':
          return 'success';

        case 'LOWSTOCK':
          return 'warn';

        case 'OUTOFSTOCK':
          return 'danger';

        default:
          return null;
      }
    },
    selectImage(image) {
      this.selectedImage = image;
    },
    prevImage() {
      const currentIndex = this.images.indexOf(this.selectedImage);
      this.selectedImage =
        this.images[
        (currentIndex - 1 + this.images.length) % this.images.length
        ];
    },
    nextImage() {
      const currentIndex = this.images.indexOf(this.selectedImage);
      this.selectedImage =
        this.images[(currentIndex + 1) % this.images.length];
    },
  },
};
</script>

<style scoped>
.product-section {
  /* background-color: #f9fafc; */

}
</style>
