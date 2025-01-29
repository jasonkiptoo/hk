<template>
  <div
    class="w-full md:w-1/3 p-6 m-5 border dark:border-orange-600 rounded-lg shadow-lg"
  >
    <div
      class="text-lg font-semibold mb-2 border-b pb-2 flex justify-between items-center"
    >
      <span class="text-gray-500">Hot Deals</span>
      <!-- <div class="flex space-x-2">
        <button @click="prev" class="text-gray-500 hover:text-gray-800">
          &lt;
        </button>
        <button @click="next" class="text-gray-500 hover:text-gray-800">
          &gt;
        </button>
      </div> -->
    </div>

    <div class="">
      <Carousel
        :d_circular="true"
        :autoplayInterval="5000"
        :value="products"
        :numVisible="1"
        :numScroll="1"
        orientation="horizontal"
        containerClass="flex items-center"
        :showIndicators="false"
        :showNavigators="false"
      >
        <template #item="slotProps">
          <div class="text-center">
            <img
              :src="slotProps.data.image"
              class="object-cover rounded"
              style="max-width: 100%"
            />
            <div class="mt-2 text-sm font-medium">
              {{ slotProps.data.name }}
            </div>
            <div class="flex justify-center mt-1">
              <span v-for="star in 5" :key="star" class="text-yellow-400">
                <i
                  :class="{
                    'pi pi-star-fill': star <= slotProps.data.rating,
                    'pi pi-star': star > slotProps.data.rating,
                  }"
                ></i>
              </span>
              <span class="text-gray-500 ml-2"
                >({{ slotProps.data.reviews }})</span
              >
            </div>

            <div
              class="flex justify-center space-x-2 mt-2 text-orange-500 font-bold text-lg"
            >
              <span class="line-through text-gray-400"
                >${{ slotProps.data.oldPrice }}</span
              >
              <span>${{ slotProps.data.price }}</span>
            </div>

            <div class="flex justify-center space-x-4 mt-4">
              <div class="flex flex-col items-center">
                <div
                  class="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-full text-lg font-bold"
                >
                  21
                </div>
                <span class="text-xs mt-1 text-gray-400 font-bold">DAYS</span>
              </div>
              <div class="flex flex-col items-center">
                <div
                  class="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-full text-lg font-bold"
                >
                  00
                </div>
                <span class="text-xs mt-1 text-gray-400 font-bold">HOURS</span>
              </div>
              <div class="flex flex-col items-center">
                <div
                  class="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-full text-lg font-bold"
                >
                  00
                </div>
                <span class="text-xs mt-1 text-gray-400 font-bold">MINS</span>
              </div>
              <div class="flex flex-col items-center">
                <div
                  class="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-full text-lg font-bold"
                >
                  00
                </div>
                <span class="text-xs mt-1 text-gray-400 font-bold">SEC</span>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Carousel from "primevue/carousel";

export default {
  components: { Carousel },
  setup() {
    const carousel = ref(null);
    const products = ref([
      {
        image:
          "https://html.themexriver.com/radios/assets/img/product/img_53.png",
        name: "Amazon Basics Window Air",
        rating: 3,
        reviews: 26,
        oldPrice: 28.52,
        price: 30.52,
      },
      {
        image:
          "https://html.themexriver.com/radios/assets/img/product/img_53.png",
        name: "Amazon Basics Wall Light",
        rating: 4,
        reviews: 42,
        oldPrice: 19.53,
        price: 21.53,
      },
    ]);

    const prev = () => carousel.value.prev();
    const next = () => carousel.value.next();

    return { products, prev, next, carousel };
  },
};
</script>

<style>
.pi-star-fill {
  color: gold;
}
</style>
