import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TVehicle {
  rental_price: number;
  availability: boolean;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  seating_capacity: number;
  features: string;
  image_url: string;
  created_at?: Date;
  updated_at?: Date;
}

export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    createVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
      query: (vehicle) => ({
        url: '/vehicles',
        method: 'POST',
        body: vehicle,
      }),
    }),
    updateVehicle: builder.mutation<TVehicle, Partial<TVehicle> & { id: number }>({
      query: ({ id, ...vehicle }) => ({
        url: `/vehicles/${id}`,
        method: 'PUT',
        body: vehicle,
      }),
    }),
    deleteVehicle: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: 'DELETE',
      }),
    }),
    getVehicles: builder.query<TVehicle[], void>({
      query: () => '/vehicles',
    }),
  }),
});

