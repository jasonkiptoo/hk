<template>
  <div class="container mx-auto my-10 pa-10">
    <!-- <TopCard :categories="categories" /> -->
    <!-- <section class="flash-sales mt-12 mx-4 ">
      <Carousel :value="categories" :numVisible="4" :numScroll="5" :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
          <div class="border border-surface-200 dark:border-surface-700 rounded m-2 bg-white">
            <div class="p-4">
              <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
              <div class="flex justify-between items-center">
                <div class="mt-0 font-semibold text-xl">
                  {{ slotProps.data.price }}
                </div>
              </div>
            </div>
          </div>
        </template>
</Carousel>
</section> -->
    <!-- </div> -->
    <!-- Categories -->

    <!-- <section class="flash-sales mt-12 mx-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Browse By Category</h2>
        <div class="flex space-x-2">
          <button class="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
          <button class="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div
        class="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        <CategoryCard
          v-for="(i, index) in categories"
          :item="i"
          :key="index"
          @click="getItems(i)"
        />
      </div>
    </section> -->

    <section class="flash-sales mt-5 mx-2 full-screen" style="min-height: 900px">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Explore Our Products</h2>
        <div class="flex space-x-2">
          <button class="bg-red-500 text-white px-4 py-2">View All</button>
        </div>
      </div>
      <div class="flex">
        <!-- Left Section -->
        <!-- <FilterCard /> -->
        <!-- Right Section -->
        <div class="w-3/4">
          <div v-if="products.length > 0" class="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
            <ProductCard v-for="product in products" :key="product.id" :item="product" />
          </div>
          <div v-else class="text-center mt-6">
            <div class="relative flex justify-center items-center">
              <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-100"></div>
              <img
                src="https://freelancerdxb.s3.eu-central-1.amazonaws.com/documents/image%20%285%29__5d197f13926ac20a20a6f301d00ce69b516f83eb.png"
                class="rounded-full h-24 w-24" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import { ref } from "vue";
import FlashCard from "~/components/cards/FlashCard.vue";
import CategoryCard from "~/components/cards/CategoryCard.vue";
import ProductCard from "~/components/cards/ProductCard.vue";
import TopCard from "~/components/cards/TopCard1.vue";
import Footer from "~/components/shared/utils/Footer.vue";
import FilterCard from "~/components/cards/FilterCard.vue";

export default {
  name: "Dashboard",
  components: {
    FlashCard,
    CategoryCard,
    ProductCard,
    TopCard,
    Footer,
    FilterCard,
  },
  props: {
    searchTerm: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    watch(
      () => props.searchTerm,
      (newVal, oldVal) => {
        console.log(`searchTerm changed from ${oldVal} to ${newVal}`);
        getProduct(newVal);
      }
    );
    onMounted(async () => {
      getProduct();
      updateTime();
      await fetchCat();

      //   import { ProductService } from '@/service/ProductService';

      // ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 9)));
      //  timer.value = setInterval(updateTime(), 1000);
    });
    // const emit = defineEmits(["refresh"]);

    const value = ref([20, 80]);
    const fetching = ref(false);
    const timeLeft = ref({
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    });
    const endTime = ref(
      new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
    );
    const updateTime = () => {
      const now = new Date().getTime();
      const distance = endTime.value - now;

      if (distance > 0) {
        timeLeft.value = {
          days: Math.floor(distance / (1000 * 60 * 60 * 24))
            .toString()
            .padStart(2, "0"),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
            .toString()
            .padStart(2, "0"),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            .toString()
            .padStart(2, "0"),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
            .toString()
            .padStart(2, "0"),
        };
      } else {
        clearInterval(this.timer);
        timeLeft.value = {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        };
      }
    };
    const images = ref([

    ]);
    const categories = ref([]);
    const { $axios } = useNuxtApp();
    const products = ref([]);
    const currentIndex = ref(0);
    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % images.value.length;
    };
    const prevSlide = () => {
      currentIndex.value =
        (currentIndex.value - 1 + images.value.length) % images.value.length;
    };

    const getItems = x => {
      console.log("ca", x);
    };

    const goToSlide = index => {
      currentIndex.value = index;
    };
    const getProduct = async () => {
      fetching.value = true;

      const defaultImage =
        "https://media.istockphoto.com/id/1977230951/photo/cctv-camera-installed-on-wall-of-the-building.jpg?s=612x612&w=0&k=20&c=f-Nw4cMVtYRU5Wo5D_625XfSU694lt-pSMx35RtyeiI=";

      try {
        const { $axios } = useNuxtApp();

        // Build the request parameters dynamically
        const params = {};
        if (props.searchTerm) {
          params.searchTerm = props.searchTerm;
        }

        const response = await $axios.get("/product", { params });

        fetching.value = false;

        // Process models and attach correct images
        const modelsWithImages = response.data
          .map(product => product.models)
          .flat()
          .map(model => {
            let primaryImage = model.images?.find(img => img.isPrimary)?.uploadUrl;

            return {
              ...model,
              image: primaryImage || defaultImage, // Use primary image or fallback
            };
          });

        products.value = modelsWithImages;
      } catch (error) {
        console.error("Error fetching products:", error);
        fetching.value = false;
      }
    };


    const fetchCat = async () => {
      const { $axios } = useNuxtApp();
      try {
        const response = await $axios.get("/product/categories", {});
        categories.value = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const productss = ref([]);
    const responsiveOptions = ref([
      {
        breakpoint: "1400px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "1199px",
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: "767px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "575px",
        numVisible: 1,
        numScroll: 1,
      },
    ]);

    const getSeverity = status => {
      switch (status) {
        case "INSTOCK":
          return "success";

        case "LOWSTOCK":
          return "warn";

        case "OUTOFSTOCK":
          return "danger";

        default:
          return null;
      }
    };

    return {
      images,
      currentIndex,
      nextSlide,
      prevSlide,
      goToSlide,
      categories,
      products,
      productss,
      responsiveOptions,
      getItems,
      getSeverity,
      value,
    };
  },
};
</script>

<style scoped>
.flash-sales h2 {
  color: #ff0000;
}
</style>
