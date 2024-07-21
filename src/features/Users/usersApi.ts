import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prodURL } from '../../utils';
 
export interface TUsers {
    id: number;
    full_name: string;
    email: string;
    contact_phone: string;
    address: string;
    role: string;
    // profile_image: string;
}
 
export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: prodURL }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsers: builder.query<TUsers[], void>({
            query: () => '/users',
            providesTags: ['Users'],
            
        }),
        getUser: builder.query<TUsers, number>({
            query: (user_id) => `/users/${user_id}`,
            providesTags: [{ type: 'Users', id: "LIST" }],
        }),
        addUser: builder.mutation<TUsers, Partial<TUsers>>({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation<TUsers, Partial<TUsers>>({
            query: ({id, ...patch}) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: [{ type: 'Users', id: "LIST" }],
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Users', id: "LIST" }],
        }),
    }),
});
 
 
 