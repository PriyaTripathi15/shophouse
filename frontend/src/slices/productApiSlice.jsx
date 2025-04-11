import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      keepUnusedDataFor: 5, // Cache the data for 5 minutes
    }),
    getProductDetails: builder.query({
      query: (id) => `${PRODUCTS_URL}/${id}`,
      keepUnusedDataFor: 5, // Cache the data for 5 minutes
    }),
  }),
});

// Export hooks for the queries
export const { useGetProductsQuery, useGetProductDetailsQuery } = productApiSlice;
