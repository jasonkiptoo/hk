<template>
    <div class="mx-auto">
        <!-- Header Section -->
        <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold">
                Hot <span class="text-red-500">New Arrival</span> You May Like
            </h2>
            <!-- Tabs -->
            <div class="flex space-x-4 border-b">
                <button v-for="tab in tabs" :key="tab" @click="selectedTab = tab" :class="[
                    'px-4 py-2 text-sm font-semibold',
                    selectedTab === tab ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-600'
                ]">
                    {{ tab }}
                </button>
            </div>
        </div>

        <!-- Product Carousel -->
        <Carousel :value="filteredProducts" :numVisible="5" :numScroll="1" class="mt-4" :showIndicators="false"
            :showNavigators="false">
            <template #item="slotProps">
                <div class="border-r border-gray-200 rounded-lg p-4 text-center bg-white shadow-md">
                    <!-- New Tag -->
                    <Tag value="NEW" class=" top- bg-orange-500 text-white" />

                    <!-- Product Image -->
                    <img :src="slotProps.data.image"
                        class="h-32 mx-auto mb-2 transition-transform group-hover:scale-105" alt="Product Image" />

                    <!-- Product Name -->
                    <div class="flex flex-col items-center text-center p-2">
                        <h3 class="text-sm font-medium truncate">{{ slotProps.data.name }}</h3>

                        <!-- Rating -->
                        <!-- <Rating :modelValue="4" :readonly="true" :cancel="false" class="my-2 text-amber-400" /> -->

                        <div class="flex justify-center mt-1">
                            <span v-for="star in 5" :key="star" class="text-yellow-400">
                                <i :class="{
                                    'pi pi-star-fill': star <= slotProps.data.rating,
                                    'pi pi-star': star > slotProps.data.rating,
                                }"></i>
                            </span>
                            <span class="text-gray-500 ml-2">({{ slotProps.data.reviews }})</span>
                        </div>
                        <!-- Price -->
                        <p class="text-red-500 font-semibold">
                            (${{ slotProps.data.price }} - <span class="line-through text-gray-400">${{
                                slotProps.data.oldPrice }}</span>)
                        </p>
                    </div>

                    <!-- Hover Buttons -->
                    <div
                        class="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                            <i class="pi pi-shopping-cart text-gray-600"></i>
                        </button>
                        <button class="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                            <i class="pi pi-heart text-gray-600"></i>
                        </button>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Carousel from 'primevue/carousel';
import Tag from 'primevue/tag';
import Rating from 'primevue/rating';

const tabs = ref(["Recent", "Best Seller", "Top", "New Arrivals", "Top Rating"]);
const selectedTab = ref("Recent");

const products = ref([
    {
        name: "Galaxy S20 FE 5G Cell Phone", category: "Recent", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_53.png"
    },
    {
        name: "Galaxy S20 FE 5G Cell Phone", category: "Recent", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_53.png"
    },
    {
        name: "Galaxy S20 FE 5G Cell Phone", category: "Recent", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_53.png"
    },
    {
        name: "Galaxy S20 FE 5G Cell Phone", category: "Recent", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_53.png"
    },
    {
        name: "Rokinon Xeen CF 16mm T2.6", category: "Recent", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_64.png"
    },
    {
        name: "Galaxy S20 FE 5G Cell Phone", category: "Best Seller", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_53.png"
    },
    {
        name: "Amazon Basics Window Air Conditioner", category: "Best Seller", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_60.png"
    },
    {
        name: "Amazon Basics Window Air Conditioner", category: "Best Seller", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_60.png"
    },
    {
        name: "Amazon Basics Window Air Conditioner", category: "Best Seller", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_60.png"
    },
    {
        name: "Amazon Basics Window Air Conditioner", category: "Best Seller", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_60.png"
    },
    {
        name: "Amazon Basics Window Air Conditioner", category: "Best Seller", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_60.png"
    },
    {
        name: "JBL Tune 510BT Wireless Headphones", category: "Best Seller", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_14.png"
    },
    {
        name: "Skullcandy Dime In-Ear Earbuds", category: "New Arrivals", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_4.png"
    },
    {
        name: "Portable 2TB External Hard Drive", category: "New Arrivals", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_3.png"
    },
    {
        name: "Ninja Compact Smoothie Blender", category: "Top", price: 28.52, oldPrice: 30.00, rating: 4,
        reviews: 42, image: "https://html.themexriver.com/radios/assets/img/product/img_6.png"
    }
]);

// Filter products based on selected tab
const filteredProducts = computed(() => {
    return products.value.filter(product => product.category === selectedTab.value);
});
</script>

<style scoped>
/* Custom styling */
</style>
