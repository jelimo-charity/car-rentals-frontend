
import { createApi } from '@reduxjs/toolkit/query';
import { prodURL } from '../../utils';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { TCustomer } from '../../Types/types';

 
export const ticketApi = createApi({
    reducerPath: 'CustomerApi',
    baseQuery: fetchBaseQuery({ baseUrl: prodURL }),
    tagTypes: ['Customer'],
    endpoints: (builder) => ({
      getCustomers: builder.query<TCustomer[], void>({
        query: () => '/customers',
        providesTags: ['Customer'],
      }),
      getCustomer: builder.query<TCustomer, number>({
        query: (id) => `/customers/${id}`,
        providesTags: [{type: 'Customer', id: "LIST"}],
      }),
      addCustomer: builder.mutation<TCustomer, Partial<TCustomer>>({
        query: (newCustomer) => ({
          url: '/customers',
          method: 'POST',
          body: newCustomer,
        }),
        invalidatesTags: [{type: 'Customer', id: "LIST"}],
      }),
      updateCustomer: builder.mutation<TCustomer,{id: number, updatedCustomer: Partial<TCustomer>}>({
        query: ({id,updatedCustomer}) => ({
          url: `/customers/${id}`,
          method: 'PUT',
          body: updatedCustomer,
        }),
        invalidatesTags: [{type: 'Customer', id: "LIST"}],
      }),
      deleteCustomer: builder.mutation<void, number>({
        query: (id) => ({
          url: `/customers/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: [{type: 'Customer', id: "LIST"}],
      }),
    }),
})