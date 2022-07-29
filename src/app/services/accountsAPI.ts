import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import {RootState} from '../store';
import { AccountType, UserType } from 'utils/types';

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
        getAllAccounts: builder.query<AccountType[], void>({
            query: () => '/accounts'
        }),
        getAllUsers: builder.query<UserType[], void>({
            query: () => '/users'
        })
    })
});

export const { useGetAllAccountsQuery, useGetAllUsersQuery, useLazyGetAllAccountsQuery, useLazyGetAllUsersQuery } = accountsApi;