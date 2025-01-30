<template>
    <div class="container mx-auto p-4">
        <!-- <h1 class="text-2xl font-bold mb-4 ">Category</h1> -->
        <div class="flex gap-3">

            <div class="flex  flex-col w-1/4 border rounded-lg dark:border-orange-600">
                <div class="p-4  rounded-lg">
                    <h2 class="font-semibold">Bluetooth speaker</h2>
                </div>
                <div class="p-4  rounded-lg">
                    <h2 class="font-semibold">Digital camera</h2>
                </div>
                <div class="p-4  rounded-lg">
                    <h2 class="font-semibold">Laser printer</h2>
                </div>
                <div class="p-4  rounded-lg">
                    <h2 class="font-semibold">Electric frying pan</h2>
                </div>
                <div class="p-4  rounded-lg">
                    <h2 class="font-semibold">Robotics vacuum</h2>
                </div>
                <div class="p-4  rounded-lg">
                    <h2 class="font-semibold">External hard drive</h2>
                </div>
                <div class="p-4  rounded-lg">
                    <h2 class="font-semibold">Electric razor</h2>
                </div>
                <div class="p-4  rounded-lg">
                    <h2 class="font-semibold">Washing machine</h2>
                </div>
                <div class="p-4  rounded-lg">
                    <h2 class="font-semibold">Rice cooker</h2>
                </div>
                <div class="p-4  rounded-lg">
                    <h2 class="font-semibold">Television & Monitor</h2>
                    <p class="text-sm text-gray-600">More items</p>
                </div>
            </div>
            <div class="border rounded-lg border-orange-600 w-3/4 p-3">

                <h2 class="text-xl font-bold mb-4">Trending Products</h2>
                <Carousel :d_circular="true" circular :autoplayInterval="3000" :value="chunkedProducts" :numVisible="1"
                    :numScroll="1" orientation="horizontal" containerClass="flex items-center" :showIndicators="false"
                    :showNavigators="false">
                    <template #item="slotProps">
                        <!-- Wrapper for the grid layout -->
                        <div class="grid grid-cols-4 gap ">
                            <div v-for="(product, index) in slotProps.data" :key="index"
                                class="p-4  border-gray-500 rounded-lg bg-white shadow">
                                <div class="relative">
                                    <img :src="product.image" :alt="product.name" class="object-cover rounded mb-2"
                                        style="max-width: 100%; height: 150px;" />
                                </div>
                                <div class="font-medium text-center mb-2">{{ product.name }}</div>
                                <div class="font-semibold text-xl text-center text-orange-600">
                                    {{ product.price }}
                                </div>
                                <div class="stock text-sm text-gray-600 mt-4">
                                    <div class="relative">
                                        <div class="h-2 bg-gray-300 rounded">
                                            <div class="h-2 bg-orange-500 rounded" style="width: 65%;"></div>
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
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
    components: {
        DataTable,
        Column
    },
    computed: {
        chunkedProducts() {
            // Helper to split products into chunks of 8
            const chunkSize = 8;
            const chunks = [];
            for (let i = 0; i < this.products.length; i += chunkSize) {
                chunks.push(this.products.slice(i, i + chunkSize));
            }
            return chunks;
        },
    },
    data() {
        return {

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
                {
                    name: "Gaming Headset",
                    price: "KES 6,800.00",
                    originalPrice: "KES 7,200.00",
                    available: 150,
                    sold: 90,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_55.png",
                },
                {
                    name: "Bluetooth Earbuds",
                    price: "KES 3,500.00",
                    originalPrice: "KES 4,000.00",
                    available: 200,
                    sold: 140,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_56.png",
                },
                {
                    name: "Portable Charger",
                    price: "KES 2,800.00",
                    originalPrice: "KES 3,200.00",
                    available: 300,
                    sold: 180,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_57.png",
                },
                {
                    name: "LED Desk Lamp",
                    price: "KES 1,800.00",
                    originalPrice: "KES 2,000.00",
                    available: 250,
                    sold: 120,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_58.png",
                },
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
                {
                    name: "4K Action Camera",
                    price: "KES 18,000.00",
                    originalPrice: "KES 20,000.00",
                    available: 50,
                    sold: 20,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_59.png",
                },
                {
                    name: "Smartphone Gimbal",
                    price: "KES 12,000.00",
                    originalPrice: "KES 14,000.00",
                    available: 100,
                    sold: 40,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_60.png",
                },
                {
                    name: "WiFi Router",
                    price: "KES 8,500.00",
                    originalPrice: "KES 9,200.00",
                    available: 180,
                    sold: 95,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_61.png",
                },
                {
                    name: "Noise Cancelling Headphones",
                    price: "KES 25,000.00",
                    originalPrice: "KES 28,000.00",
                    available: 60,
                    sold: 30,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_62.png",
                },
                {
                    name: "Mini Projector",
                    price: "KES 10,500.00",
                    originalPrice: "KES 12,000.00",
                    available: 75,
                    sold: 35,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_63.png",
                },
                {
                    name: "Smart Doorbell",
                    price: "KES 5,800.00",
                    originalPrice: "KES 6,200.00",
                    available: 120,
                    sold: 70,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_64.png",
                },
                {
                    name: "Smart Plug",
                    price: "KES 1,200.00",
                    originalPrice: "KES 1,500.00",
                    available: 500,
                    sold: 300,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_65.png",
                },
                {
                    name: "Fitness Tracker",
                    price: "KES 3,200.00",
                    originalPrice: "KES 3,800.00",
                    available: 220,
                    sold: 150,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_66.png",
                },
                {
                    name: "Laptop Stand",
                    price: "KES 2,500.00",
                    originalPrice: "KES 3,000.00",
                    available: 340,
                    sold: 220,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_67.png",
                },
                {
                    name: "USB Desk Fan",
                    price: "KES 900.00",
                    originalPrice: "KES 1,200.00",
                    available: 600,
                    sold: 400,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_68.png",
                },
                {
                    name: "Gaming Keyboard",
                    price: "KES 7,200.00",
                    originalPrice: "KES 8,000.00",
                    available: 100,
                    sold: 60,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_69.png",
                },
                {
                    name: "Wireless Mouse",
                    price: "KES 1,500.00",
                    originalPrice: "KES 2,000.00",
                    available: 400,
                    sold: 300,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_70.png",
                },
                {
                    name: "Smart Plug",
                    price: "KES 1,200.00",
                    originalPrice: "KES 1,500.00",
                    available: 500,
                    sold: 300,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_65.png",
                },
                {
                    name: "Fitness Tracker",
                    price: "KES 3,200.00",
                    originalPrice: "KES 3,800.00",
                    available: 220,
                    sold: 150,
                    image: "https://html.themexriver.com/radios/assets/img/product/img_66.png",
                },

            ],
        };
    }
};
</script>

<style>
/* Add any custom styles here */
</style>