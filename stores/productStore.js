// stores/productStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore('product', {
  state: () => ({
    cartItems: [],      // Array to hold cart items
    cartCount: 0,       // Cart item count
    cartTotal: 0,       // Cart total amount
    wishListItems: [],  // Array to hold wishlist items
    wishListCount: 0,   // Wishlist item count
  }),

  actions: {
    // Fetch cart items from the server and update the cart state
    async getCartItems() {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.get("/product/cart");
        
        this.cartItems = response.data;  // Update the cart items
        this.cartCount = response.data.length; // Update the cart item count
        console.log(response.data)

        // Calculate the cart total (assuming each product has a price property)
        this.cartTotal = response.data.reduce((total, item) => total + (item.quantity * item.product.defaultPrice), 0);
        console.log(this.cartTotal, "cacsad")
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    },

    // Add a product to the cart
    async addToCart(productId, quantity) {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post("/product/cart/add", { productId, quantity });
        // this.cartItems.push(response.data);

       await this.getCartItems()
        this.cartCount = this.cartItems.length;
        // this.cartTotal += (quantity * response.data.price);
        return { response }; 
      } catch (error) {
        
        console.error("Error adding to cart:", error);
      }
    },

    // Remove a product from the cart
    async removeFromCart(productId) {
      try {
        const { $axios } = useNuxtApp();
        await $axios.delete(`/product/cart/remove/${productId}`);
        this.getCartItems()
        
        // Remove the item from cart items
        // const itemIndex = this.cartItems.findIndex(item => item.id === productId);
        // if (itemIndex !== -1) {
        //   this.cartTotal -= (this.cartItems[itemIndex].quantity * this.cartItems[itemIndex].price);
        //   this.cartItems.splice(itemIndex, 1);  // Remove item from cart
        // }

        // // Recalculate cart count
        // this.cartCount = this.cartItems.length;
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    },

    // Fetch wishlist items from the server
    async getWishList() {
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.get("/product/wishlist");

        this.wishListItems = response.data; // Update the wishlist items
        this.wishListCount = response.data.length; // Update the wishlist count
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        // Fallback to localStorage if no response
        const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        this.wishListItems = localWishlist;
        this.wishListCount = localWishlist.length;
      }
    },

// Add a product to the wishlist
// Add a product to the wishlist
async addToWishlist(productId) {
    try {
      const { $axios } = useNuxtApp();
      const product = { productId };
  
      // Send a POST request to the API
      const res = await $axios.post("/product/wishlist/add", product);
  
      if (res) {
        // Update wishlist count and persist to localStorage
        this.wishListCount = this.wishListItems.length;
        localStorage.setItem("wishlist", JSON.stringify(this.wishListItems));
        return { res }; // Return the response for further actions
      }
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn("User is not logged in. Adding product to localStorage wishlist.");
        // Add product to localStorage wishlist
        const localWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        
        // Prevent duplicate entries
        if (!localWishlist.some((item) => item.id === productId)) {
          localWishlist.push({ id: productId });
          localStorage.setItem("wishlist", JSON.stringify(localWishlist));
  
          console.log("Product added to localStorage wishlist.");
        } else {
          console.log("Product already exists in localStorage wishlist.");
        }
      } else {
        console.error("Error adding to wishlist:", error);
      }
    }
  }
,   

    // Remove a product from the wishlist
    async removeFromWishlist(productId) {
      try {
        const { $axios } = useNuxtApp();
        await $axios.delete(`/product/wishlist/${productId}`);

        // Remove item from wishlist
        const index = this.wishListItems.findIndex(item => item.id === productId);
        if (index !== -1) {
          this.wishListItems.splice(index, 1);
        }
        
        this.wishListCount = this.wishListItems.length;  // Update wishlist count
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    }
  },

  getters: {
    // Getter for cart item count
    getCartCount: (state) => state.cartCount,
    
    // Getter for wishlist item count
    getWishListCount: (state) => state.wishListCount,
    
    // Getter for cart total value
    getCartTotal: (state) => state.cartTotal,
  },

  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
});
