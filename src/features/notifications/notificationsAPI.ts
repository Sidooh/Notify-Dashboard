import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { Notification, Setting } from 'utils/types';
import { RootState } from 'app/store';
import { ApiResponse } from '@nabcellent/sui-react';

export const notificationsApi = createApi({
    reducerPath: 'notificationsApi',
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
        getDashboard: builder.query<any, void>({
            query: () => '/dashboard',
        }),

        //  Notification Endpoints
        notifications: builder.query<Notification[], void>({
            query: () => '/notifications',
            providesTags: ['Notification'],
            transformResponse: (response: ApiResponse<Notification[]>) => response.data,
        }),
        notification: builder.query<Notification, string>({
            query: id => `/notifications/${id}?with_notifiables=true`,
            providesTags: ['Notification'],
            transformResponse: (response: ApiResponse<Notification>) => response.data,
        }),
        storeNotification: builder.mutation<Notification, Partial<Notification>>({
            query: notification => ({
                url: '/notifications',
                method: 'POST',
                body: notification
            })
        }),
        retryNotification: builder.mutation<Notification, number>({
            query: id => ({
                url: `/notifications/${id}/retry`,
                method: 'POST'
            }),
            invalidatesTags: ['Notification']
        })
    })
});

export const {
    useGetDashboardQuery,

    useNotificationsQuery,
    useNotificationQuery,
    useStoreNotificationMutation,

    useRetryNotificationMutation
} = notificationsApi;