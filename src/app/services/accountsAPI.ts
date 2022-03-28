import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from '../../config';
import {RootState} from '../store';

type AccountType = {
    id: number
    phone: string,
    active: boolean
}

export const accountsApi = createApi({
    reducerPath: 'accountsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.accounts.api.url}`,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.auth?.token

            console.log(`jwt=${token}`);
            if (token) headers.set('Cookie', `jwt=${token}`)

            return headers
        },
    }),
    endpoints: (builder) => ({
        getAllAccounts: builder.query<AccountType[], void>({
            query: () => '/accounts'
        })
    })
});

export const { useGetAllAccountsQuery } = accountsApi;