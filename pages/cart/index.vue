<template>
  <div class="cart">
    <table class="responsive-table container mx-auto">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartItems" :key="item.id">
          <td>
            <img
              :src="item.product?.image || 'https://via.placeholder.com/80x80'"
              alt="Product Image"
            />
            {{ item.productModel.name }}
          </td>
          <td>
            KES
            {{ formattedPrice(item.productModel?.price) }}
          </td>
          <td>
            <input
              type="number"
              v-model.number="item.quantity"
              class="w-16 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              @change="updateQuantity(item.id, item.quantity)"
              min="1"
            />
          </td>
          <td>
            KES

            {{ formattedPrice(item.productModel.price * item.quantity) }}
          </td>
          <td>
            <button
              @click="removeItem(item)"
              style="
                background-color: #2869a5;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
              "
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex-container container mx-auto">
      <button class="return-shop-btn" @click="returnToShop">
        Return To Shop
      </button>
      <div class="cart-total border p-12">
        <h3>Cart Total</h3>
        <p>Subtotal: KES {{ formattedPrice(cartTotal) }}</p>
        <!-- <p>Shipping: Free</p> -->
        <hr />
        <p>
          <strong>Total: KES {{ formattedPrice(cartTotal) }}</strong>
        </p>
        <button class="checkout-btn" @click="proceedToCheckout">
          Proceed to checkout
        </button>
      </div>
    </div>

    <div class="cart-actions">
      <!-- <div class="coupon">
                <input v-model="coupon" type="text" placeholder="Coupon Code" />
                <button @click="applyCoupon">Apply Coupon</button>
            </div> -->
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";

const { $formatPrice } = useNuxtApp();

// Router and Store
const router = useRouter();
const productStore = useProductStore();
const { $axios } = useNuxtApp();

const coupon = ref("");

// Computed properties
const cartTotal = computed(() => productStore.cartTotal);
const cartItems = computed(() => productStore.cartItems);

const formattedPrice = price => {
  return $formatPrice(price);
};
// Fetch cart items from API
const getCartItems = async () => {
  try {
    const response = await $axios.get(`/product/cart`);
    cartItems.value = response.data.map(item => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        ...item.product,
        price: 100, // Replace with actual API price if available
        image: "https://via.placeholder.com/80x80", // Replace with actual product image
      },
    }));
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};

// Update quantity of a specific item
const updateQuantity = (id, quantity) => {
  const item = cartItems.value.find(item => item.id === id);
  if (item && quantity > 0) {
    item.quantity = quantity;
  }
};

// Remove an item from the cart
const removeItem = async item => {
  await productStore.removeFromCart(item.productModelId);
};

// Apply a discount coupon
const applyCoupon = () => {
  if (coupon.value.trim() === "DISCOUNT10") {
    cartItems.value = cartItems.value.map(item => ({
      ...item,
      product: {
        ...item.product,
        price: item.product.price * 0.9, // Apply 10% discount
      },
    }));
    alert("Coupon applied: 10% discount!");
  } else {
    alert("Invalid coupon code.");
  }
};

// Navigation actions
const returnToShop = () => {
  router.push("/");
};

const proceedToCheckout = () => {
  router.push("/checkout");
};

// Fetch cart items when the component is mounted
onMounted(() => {
  //   getCartItems();
});
</script>

<style>
.cart {
  margin: 20px;
}

.responsive-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.responsive-table th,
.responsive-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.responsive-table img {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.cart-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.return-shop-btn {
  padding: 10px 20px;
  background-color: #ddd;
  border: none;
  cursor: pointer;
}

.coupon {
  display: flex;
  gap: 10px;
  align-items: center;
}

.coupon input {
  padding: 8px;
  border: 1px solid #ddd;
  flex: 1;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 20px;
}

.return-shop-btn {
  padding: 10px 20px;
  background-color: #ddd;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.cart-total {
  width: 300px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: left;
}

.cart-total h3 {
  margin-bottom: 15px;
}

.cart-total p {
  margin: 8px 0;
}

.cart-total hr {
  margin: 15px 0;
  border: 0.5px solid #ddd;
}

.checkout-btn {
  width: 100%;
  padding: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.coupon button {
  padding: 8px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
}

.cart-total {
  align-self: flex-end;
  text-align: left;
  width: 300px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  margin-top: 20px;
  position: relative;
}

.cart-total h3 {
  margin-bottom: 20px;
}

.cart-total p {
  margin: 8px 0;
}

.cart-total hr {
  margin: 20px 0;
  border: 0.5px solid #ddd;
}

.checkout-btn {
  width: 100%;
  padding: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .responsive-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .cart-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-total {
    text-align: left;
    width: 100%;
  }

  .flex-container {
    display: block;
    justify-content: space-between;
    align-items: start;
    margin-top: 20px;
  }
}
</style>
