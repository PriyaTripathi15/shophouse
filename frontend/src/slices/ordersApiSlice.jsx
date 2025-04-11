// src/slices/ordersApiSlice.js

import { ORDERS_URL, PAYPAL_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create Order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: orderData,
        credentials: 'include', // Send cookies with the request
      }),
    }),

    // Get Order Details
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        credentials: 'include',
      }),
      providesTags: ['Order'],
    }),

    // Pay Order
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
        credentials: 'include',
      }),
    }),

    // Get PayPal Client ID
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
        credentials: 'include',
      }),
    }),

    // Get Logged-in User Orders
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        credentials: 'include',
      }),
      providesTags: ['Order'],
    }),

    // Get All Orders (Admin)
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        credentials: 'include',
      }),
      providesTags: ['Order'],
    }),

    // Deliver Order (Admin)
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
export const { endpoints } = ordersApiSlice;