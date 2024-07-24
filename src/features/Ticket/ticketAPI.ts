import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  prodURL } from '../../utils';
import { TCustomer } from '../../Types/types';

export const ticketApi = createApi({
  reducerPath: 'ticketApi',
  baseQuery: fetchBaseQuery({ baseUrl: prodURL }),
  tagTypes: ['Ticket'],
  endpoints: (builder) => ({
    addTicket: builder.mutation<TCustomer, Partial<TCustomer>>({
      query: (newTicket) => ({
        url: '/customers',
        method: 'POST',
        body: newTicket,
      }),
      invalidatesTags: [{ type: 'Ticket', id: 'LIST' }],
    }),
    // other endpoints can be defined here if needed
  }),
});

// export const { useAddTicketMutation } = ticketApi;
