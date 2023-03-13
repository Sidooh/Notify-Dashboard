import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { Notification, Setting, SMSProvider } from '../../utils/types';
import { ApiResponse } from '@nabcellent/sui-react';

export const smsProvidersApi = createApi({
    reducerPath: 'smsProvidersApi',
    keepUnusedDataFor: 60 * 5, // 5 minutes
    tagTypes: [
        'SMSProvider'
    ],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.notify.api.url}/sms-providers`,
        prepareHeaders: (headers) => {
            const auth = JSON.parse(localStorage.getItem('auth') || '{}');

            if (auth.token) headers.set('Authorization', `Bearer ${auth.token}`);

            return headers;
        }
    }),
    endpoints: builder => ({
        getSMSProviders: builder.query<SMSProvider[], void>({
            query: () => '',
            providesTags: ['SMSProvider'],
            transformResponse: (response: ApiResponse<SMSProvider[]>) => response.data,
        }),
        storeSMSProvider: builder.mutation<SMSProvider, Partial<SMSProvider>>({
            query: provider => ({
                url: '/',
                method: 'POST',
                body: provider
            }),
            invalidatesTags: ['SMSProvider'],
            transformResponse: (response: ApiResponse<SMSProvider>) => response.data,
        }),
        updateSMSProvider: builder.mutation<SMSProvider, Partial<SMSProvider>>({
            query: ({id, ...post}) => ({
                url: `/${id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['SMSProvider'],
            transformResponse: (response: ApiResponse<SMSProvider>) => response.data,
        }),
        deleteSMSProvider: builder.mutation<void, string>({
            query: id => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['SMSProvider']
        })
    })
});

export const {
    useGetSMSProvidersQuery,
    useStoreSMSProviderMutation,
    useUpdateSMSProviderMutation,
    useDeleteSMSProviderMutation
} = smsProvidersApi;