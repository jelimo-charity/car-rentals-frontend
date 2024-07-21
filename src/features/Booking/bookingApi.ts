

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { TBooking, TLocation } from '../../Types/types';
import { prodURL } from '../../utils';
 
export const bookingApi = createApi({
    reducerPath: 'bookingsApi',
    baseQuery: fetchBaseQuery({ baseUrl: prodURL }),
    "tagTypes": ["booking"],
    endpoints: (builder) => ({
      geTBookings: builder.query<TBooking[], void>({
        query: () => '/bookings',
        providesTags: ['booking'],
      }),
      geTBooking: builder.query<TBooking, number>({
        query: (id) => `/bookings/users/${id}`,
        providesTags: [{type: 'booking', id: "LIST"}],
     
      }),
      addbooking: builder.mutation<TBooking, Partial<TBooking>>({
        query: (newbooking) => ({
          url: '/bookings',
          method: 'POST',
          body: newbooking,
        }),
        invalidatesTags: [{type: 'booking', id: "LIST"}],
      }),
      getLocations: builder.query<TLocation[], void>({
        query: () => '/locations',
      }),
      updatebooking: builder.mutation<TBooking,{id: number, updatedbooking: TBooking}>({
        query: ({id,updatedbooking}) => ({
          url: `/bookings/${id}`,
          method: 'PUT',
          body: updatedbooking,
        }),
        invalidatesTags: [{type: 'booking', id: "LIST"}],
      }),
      deletebooking: builder.mutation<void, number>({
        query: (bookingId) => ({
          url: `/bookings/${bookingId}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{type: 'booking', id: "LIST"}],
      }),
    }),
  });

