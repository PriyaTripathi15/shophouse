import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice';
import cartSliceReducer from '../slices/cartSlice'; // Added cartSliceReducer
import { productApiSlice } from '../slices/productApiSlice';
import authSliceReducer from '../slices/authSlice'; // Added authSliceReducer
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [productApiSlice.reducerPath]: productApiSlice.reducer, // Added productApiSlice.reducer
        cart: cartSliceReducer, // Added cartSliceReducer  
        auth: authSliceReducer, // Added authSliceReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(productApiSlice.middleware), // Added productApiSlice.middleware
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

