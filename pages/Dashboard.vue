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

    <section
      class="flash-sales mt-5 mx-2 full-screen"
      style="min-height: 900px"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Explore Our Products</h2>
        <div class="flex space-x-2">
          <button class="bg-red-500 text-white px-4 py-2">View All</button>
        </div>
      </div>
      <div class="flex">
        <!-- Left Section -->
        <FilterCard />
        <!-- Right Section -->
        <div class="w-3/4">
          <div
            v-if="products.length > 0"
            class="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
          >
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :item="product"
            />
          </div>
          <div v-else class="text-center mt-6">
            <div class="relative flex justify-center items-center">
              <div
                class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-100"
              ></div>
              <img
                src="https://freelancerdxb.s3.eu-central-1.amazonaws.com/documents/image%20%285%29__5d197f13926ac20a20a6f301d00ce69b516f83eb.png"
                class="rounded-full h-24 w-24"
              />
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
      {
        src: "data:image/jpeg;base64,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",
        alt: "Image 1",
        title: "HD Analogue Camera",
        description: "High-definition analogue cameras for security systems.",
      },
      {
        src: "https://media.istockphoto.com/id/1405489463/photo/three-quarter-view-of-varifocal-surveillance-camera-with-a-house-on-background.jpg?s=612x612&w=0&k=20&c=3YxtJAA4DiOgew23ZFNOgMc6Mmg29_D0oy_RWvNTA2w=",
        alt: "Image 2",
        title: "IP Network Camera",
        description: "Advanced IP cameras with superior video quality.",
      },
      {
        src: "https://media.istockphoto.com/id/1410977641/photo/high-technology-security-monitoring-system-cctv-camera.jpg?s=612x612&w=0&k=20&c=ueVgTwwn5Xq-S0Tz6Wfj9sILEubWxURkzkvVrzpSYRI=",
        alt: "Image 3",
        title: "Access Control Product",
        description: "Reliable access control systems for secure environments.",
      },
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
        "https://media.istockphoto.com/id/1977230951/photo/cctv-camera-installed-on-wall-of-the-building-scan-the-area-for-surveillance-purposes-can-be.jpg?s=612x612&w=0&k=20&c=f-Nw4cMVtYRU5Wo5D_625XfSU694lt-pSMx35RtyeiI=";

      const dummy = {
        images: [
          "https://media.istockphoto.com/id/1483517773/photo/surveillance-camera.jpg?s=612x612&w=0&k=20&c=b9aT4ddM8TUCDLSpxEVA6QgRXRrvFRw-Wjzg57fmWls=",
          "https://media.istockphoto.com/id/2179990939/photo/cctv-camera-installed-on-wall-of-the-building.jpg?s=612x612&w=0&k=20&c=Kel7XNE58teHLmVVka3ClU3fm_bku8X7BARtBGGRMoo=",
          "https://media.istockphoto.com/id/1405489463/photo/three-quarter-view-of-varifocal-surveillance-camera-with-a-house-on-background.jpg?s=612x612&w=0&k=20&c=3YxtJAA4DiOgew23ZFNOgMc6Mmg29_D0oy_RWvNTA2w=",
          "https://media.istockphoto.com/id/1715171405/photo/security-camera-on-the-wall-of-modern-office-building.jpg?s=612x612&w=0&k=20&c=gQ7aKD7P6LUk5OkbEUvZjq1xYElMpYJajwClN4T9-yo=",
          "https://media.istockphoto.com/id/1321542113/photo/exterior-of-a-villa-with-security-camera.jpg?s=612x612&w=0&k=20&c=OGDHCN8QMIoZ7XwaXCbMH2-pqbbbTJJ91Y2MZg_-MTU=",
        ],
      };

      try {
        const { $axios } = useNuxtApp();

        // Build the request parameters dynamically
        const params = {};
        if (props.searchTerm) {
          params.searchTerm = props.searchTerm;
        }

        const response = await $axios.get("/product", { params });

        fetching.value = false;

        // Flattening models from all products and attaching images
        const models = response.data.map(product => product.models).flat();

        // Here, we assign images to models instead of products
        const modelsWithImages = models.map(model => {
          if (!model.images || model.images.length === 0) {
            model.images = [defaultImage];
          }

          const randomIndex = Math.floor(Math.random() * dummy.images.length);
          model.image = dummy.images[randomIndex];

          return model;
        });

        // Now we have modelsWithImages with model details and image
        products.value = modelsWithImages;
      } catch (error) {
        fetching.value = false;

        console.error("Error fetching products:", error);
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
