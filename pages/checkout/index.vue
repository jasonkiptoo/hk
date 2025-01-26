<template>
    <div class="container mx-auto pt-12">
        <div class="breadcrumbs">
            <p>Account / My Account / Product / View Cart / <strong>Checkout</strong></p>
        </div>

        <div class="checkout-container">
            <!-- Billing Details -->
            <div class="billing-details">
                <h2>Billing Details</h2>
                <form>
                    <div class="form-group">
                        <label for="first-name">First Name*</label>
                        <input type="text" id="first-name" placeholder="First Name" required />
                    </div>
                    <div class="form-group">
                        <label for="company-name">Company Name</label>
                        <input type="text" id="company-name" placeholder="Company Name" />
                    </div>
                    <div class="form-group">
                        <label for="street-address">Street Address*</label>
                        <input type="text" id="street-address" placeholder="Street Address" required />
                    </div>
                    <div class="form-group">
                        <label for="apartment">Apartment, floor, etc. (optional)</label>
                        <input type="text" id="apartment" placeholder="Apartment, floor, etc." />
                    </div>
                    <div class="form-group">
                        <label for="city">Town/City*</label>
                        <input type="text" id="city" placeholder="Town/City" required />
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number*</label>
                        <input type="tel" id="phone" placeholder="Phone Number" required />
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address*</label>
                        <input type="email" id="email" placeholder="Email Address" required />
                    </div>
                </form>
            </div>

            <!-- Cart Summary -->
            <div class="cart-summary">
                <h3>Cart Summary</h3>

                <!-- Cart Items -->
                <div class="cart-items">
                    <div v-for="item in cartItems" :key="item.id" class="cart-item">
                        <img :src="item.product.image || 'https://via.placeholder.com/80x80'" />
                        <p>{{ item.product.name }}</p>
                        <p>KES {{ (item.product.price * item.quantity).toFixed(2) }}</p>
                    </div>
                </div>

                <!-- Bottom Section -->
                <div class="cart-summary-bottom">
                    <p>Subtotal: <strong>KES {{ cartTotal.toFixed(2) }}</strong></p>
                    <p>Shipping: <strong>Free</strong></p>
                    <hr />
                    <p>Total: <strong>KES {{ cartTotal.toFixed(2) }}</strong></p>

                    <!-- Payment Methods -->
                    <div class="payment-methods">
                        <label>
                            <input type="radio" name="payment-method" value="bank" /> M-Pesa
                        </label>
                        <label>
                            <input type="radio" name="payment-method" value="cash" checked /> Cash on delivery
                        </label>
                    </div>

                    <!-- Place Order Button -->
                    <button class="place-order-btn" @click="placeOrder">Place Order</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
    setup() {
        const cartItems = ref([
            {
                id: 1,
                product: {
                    name: "LCD Monitor",
                    price: 650,
                    image: "https://via.placeholder.com/80x80",
                },
                quantity: 1,
            },
            {
                id: 2,
                product: {
                    name: "H1 Gamepad",
                    price: 550,
                    image: "https://via.placeholder.com/80x80",
                },
                quantity: 2,
            },
        ]);

        const getCartItems = async () => {
            try {
                const { $axios } = useNuxtApp();
                const response = await $axios.get(`/product/cart`);
                // Map API response to cartItems
                cartItems.value = response.data.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                    product: {
                        ...item.product,
                        price: 100, // Map or replace with actual API price if available
                        image: "https://via.placeholder.com/80x80" // map this 
                    },
                }));
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        }
        const coupon = ref("");
        const cartTotal = computed(() =>
            cartItems.value.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
            )
        );

        const applyCoupon = () => {
            if (coupon.value === "DISCOUNT10") {
                cartItems.value.forEach((item) => {
                    item.product.price = item.product.price * 0.9;
                });
                alert("Coupon applied: 10% discount!");
            } else {
                alert("Invalid coupon code.");
            }
        };

        const placeOrder = () => {
            alert("Order placed successfully!");
        };


        onMounted(() => {
            getCartItems();
        });

        return {
            cartItems,
            cartTotal,
            coupon,
            applyCoupon,
            placeOrder,
        };
    },
};
</script>

<style scoped>
.checkout-page {
    /* max-width: 1200px;
    margin: 0 auto;
    padding: 20px; */
}

.breadcrumbs {
    margin-bottom: 20px;
    color: #999;
    font-size: 14px;
}

.checkout-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
}

.billing-details {
    flex: 1;
}

.billing-details h2 {
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.cart-summary {
    width: 400px;
    background: #f9f9f9;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.cart-summary h3 {
    margin-bottom: 20px;
}

.cart-items {
    margin-bottom: 15px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.cart-item img {
    width: 50px;
    height: 50px;
}

.payment-methods label {
    display: block;
    margin: 10px 0;
}

.coupon-section {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}

.coupon-section input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.coupon-section button {
    padding: 10px 15px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
}

.place-order-btn {
    width: 100%;
    padding: 10px 0;
    background-color: #f44336;
    color: white;
    border: none;
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
    border-radius: 4px;
    cursor: pointer;
}

.cart-summary {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    background: #f9f9f9;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.cart-items {
    flex-grow: 1;
    overflow-y: auto;
    /* Enable scrolling if items exceed available space */
    margin-bottom: 20px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.cart-item img {
    width: 50px;
    height: 50px;
}

.cart-summary-bottom {
    border-top: 1px solid #ddd;
    padding-top: 15px;
}

.payment-methods label {
    display: block;
    margin: 10px 0;
}

.place-order-btn {
    width: 100%;
    padding: 10px 0;
    background-color: #f44336;
    color: white;
    border: none;
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
    border-radius: 4px;
    cursor: pointer;
}




/* Media Query for larger screens */
@media (min-width: 768px) {
    .checkout-container {
        display: flex;
        /* Horizontal layout for larger devices */
        justify-content: space-between;
        /* flex-direction: row; */
    }

    .billing-details {
        flex: 1;
    }

    .cart-summary {
        width: 400px;
    }
}

/* Additional tweaks for very small screens */
@media (max-width: 480px) {
    .checkout-container {
        display: block;
        justify-content: space-between;
        flex-direction: row;
    }

    .form-group label {
        font-size: 12px;
        /* Adjust label font size for better fit */
    }

    .form-group input {
        font-size: 14px;
        /* Slightly reduce input font size */
        padding: 8px;
        /* Reduce padding for better spacing */
    }

    .cart-item {
        flex-direction: column;
        /* Stack cart items vertically */
        align-items: flex-start;
    }

    .cart-item img {
        width: 80px;
        height: 80px;
        margin-bottom: 10px;
        /* Add space between image and text */
    }

    .place-order-btn {
        padding: 12px;
        font-size: 14px;
    }
}
</style>