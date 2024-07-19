import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TUsers } from '../../Types/types'; // Adjust this path as per your actual types

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }), // Adjust your API base URL
  tagTypes: ['Profile'], // Define tag types for caching
  endpoints: (builder) => ({
    getUserProfile: builder.query<TUsers, void>({
      query: () => '/users', // Adjust endpoint path as needed
      providesTags: ['Profile'], // Tag for caching
    }),
    updateUserProfile: builder.mutation<TUsers, Partial<TUsers>>({
      query: (updatedProfile) => ({
        url: '/profile', // Adjust endpoint path as needed
        method: 'PUT',
        body: updatedProfile,
      }),
      invalidatesTags: ['Profile'], // Invalidate cache on update
    }),
  }),
});

// Export hooks for usage in components
// export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = profileApi;
