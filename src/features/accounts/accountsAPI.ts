import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from '../../app/store';
import { Account, ApiResponse, User } from '@nabcellent/sui-react';

export const accountsApi = createApi({
    reducerPath: 'accountsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.accounts.api.url}`,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.auth?.token

            if (token) headers.set('authorization', `Bearer ${token}`)

            return headers
        },
    }),
    endpoints: (builder) => ({
        getAllAccounts: builder.query<Account[], void>({
            query: () => '/accounts',
            transformResponse: (response: ApiResponse<Account[]>) => response.data,
        }),
        getAllUsers: builder.query<User[], void>({
            query: () => '/users',
            transformResponse: (response: ApiResponse<User[]>) => response.data,
        })
    })
});

export const {
    useGetAllAccountsQuery,
    useGetAllUsersQuery,
} = accountsApi;