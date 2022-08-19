import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { Notification, Setting } from 'utils/types';
import { RootState } from 'app/store';
import { ApiResponse } from '@nabcellent/sui-react';

export const smsNotificationsApi = createApi({
    reducerPath: 'smsNotificationsApi',
    keepUnusedDataFor: 60 * 5, // Five minutes
    tagTypes: ['Notification', 'Setting'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.notify.api.url}`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.auth?.token;

            if (token) headers.set('authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints: (builder) => ({
        //  Dashboard Endpoints
        getSMSNotifications: builder.query<Notification[], void>({
            query: () => '/sms',
            transformResponse: (response: ApiResponse<Notification[]>) => response.data
        }),
    })
});

export const {
    useGetSMSNotificationsQuery,
} = smsNotificationsApi;