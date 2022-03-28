import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CONFIG} from '../../config';

type AccountType = {
    id: number
    phone: string,
    active: boolean
}

export const accountsApi = createApi({
    reducerPath: 'accountsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.accounts.api.url}`,
    }),
    endpoints: (builder) => ({
        accounts: builder.query<AccountType[], void>({
            query: () => '/accounts'
        })
    })
});

export const {useAccountsQuery} = accountsApi;