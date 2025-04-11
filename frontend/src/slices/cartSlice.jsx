import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const initialCart = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cartItems: initialCart,
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}, // Separate shippingAddress property
  paymentMethod: 'paypal',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x._id !== action.payload
      );

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

 
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems'); // Remove cart items from local storage
    },
  

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload; // Update the shippingAddress property
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress)); // Save to localStorage
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload; // Update the paymentMethod property
    },
  },
});

export const { addToCart, removeFromCart, clearCart, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;