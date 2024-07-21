import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TLocation} from '../../Types/types';
import { prodURL } from '../../utils';

 
export const locationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: fetchBaseQuery({ baseUrl: prodURL }),
    tagTypes: ['Location'],
    endpoints: (builder) => ({
      getLocations: builder.query<TLocation[], void>({
        query: () => '/locations',
        providesTags: ['Location'],
      }),
      getLocation: builder.query<TLocation, number>({
        query: (id) => `/locations/${id}`,
        providesTags: [{type: 'Location', id: "LIST"}],
      }),
      addLocation: builder.mutation<TLocation, Partial<TLocation>>({
        query: (newLocation) => ({
          url: '/locations',
          method: 'POST',
          body: newLocation,
        }),
        invalidatesTags: [{type: 'Location', id: "LIST"}],
      }),
      updateLocation: builder.mutation<TLocation,{id: number, updatedLocation: Partial<TLocation>}>({
        query: ({id,updatedLocation}) => ({
          url: `/locations/${id}`,
          method: 'PUT',
          body: updatedLocation,
        }),
        invalidatesTags: [{type: 'Location', id: "LIST"}],
      }),
      deleteLocation: builder.mutation<void, number>({
        query: (id) => ({
          url: `/locations/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{type: 'Location', id: "LIST"}],
      }),
    }),
})