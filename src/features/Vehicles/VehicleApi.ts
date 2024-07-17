import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { TVehicle } from '../../Types/types';
 
export const vehiclesApi = createApi({
    reducerPath: 'vehiclesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    "tagTypes": ["Vehicle"],
    endpoints: (builder) => ({
      getVehicles: builder.query<TVehicle[], void>({
        query: () => '/vehicles',
        providesTags: ['Vehicle'],
      }),
      getVehicle: builder.query<TVehicle, number>({
        query: (id) => `/vehicles/${id}`,
        providesTags: [{type: 'Vehicle', id: "LIST"}],
     
      }),
      addVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
        query: (newVehicle) => ({
          url: '/vehicles',
          method: 'POST',
          body: newVehicle,
        }),
        invalidatesTags: [{type: 'Vehicle', id: "LIST"}],
      }),
      updateVehicle: builder.mutation<TVehicle,{id: number, updatedVehicle: TVehicle}>({
        query: ({id,updatedVehicle}) => ({
          url: `/vehicles/${id}`,
          method: 'PUT',
          body: updatedVehicle,
        }),
        invalidatesTags: [{type: 'Vehicle', id: "LIST"}],
      }),
      deleteVehicle: builder.mutation<void, number>({
        query: (vehicleId) => ({
          url: `/vehicles/${vehicleId}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{type: 'Vehicle', id: "LIST"}],
      }),
    }),
  });