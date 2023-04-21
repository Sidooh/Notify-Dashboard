import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { RootState } from 'app/store';
import { ApiResponse, Status } from '@nabcellent/sui-react';
import { SMSProvider } from "utils/enums";

export type NotificationsSLOResponse = {
    year: number,
    count: number,
    status: Status
}

export type VendorsSLOResponse = {
    tende: number,
    vouchers: number,
}

type ChartData = {
    count: number
    amount: number
    date: string
    provider: SMSProvider
    status: Status
}

export const analyticsApi = createApi({
    reducerPath: 'analyticsApi',
    keepUnusedDataFor: 60 * 5, // Five minutes
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.notify.api.url}/analytics`,
        prepareHeaders: async (headers, { getState }) => {
            const token = (getState() as RootState).auth.auth?.token;

            if (token) headers.set('authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getNotificationsSLO: builder.query<NotificationsSLOResponse[], boolean>({
            query: (bypass_cache) => ({
                url: '/slo/notifications',
                params: { bypass_cache }
            }),
            transformResponse: (res: ApiResponse<NotificationsSLOResponse[]>) => res.data
        }),
        getVendorsSLO: builder.query<VendorsSLOResponse, boolean>({
            query: (bypass_cache) => ({
                url: '/slo/vendors',
                params: { bypass_cache }
            }),
            transformResponse: (res: ApiResponse<VendorsSLOResponse>) => res.data
        }),
        getNotifications: builder.query<ChartData[], boolean>({
            query: (bypass_cache) => ({
                url: '/notifications',
                params: { bypass_cache }
            }),
            transformResponse: (res: ApiResponse<ChartData[]>) => res.data
        }),
        getNotificationCosts: builder.query<ChartData[], void>({
            query: (bypass_cache) => ({
                url: '/notification-costs',
                params: { bypass_cache }
            }),
            transformResponse: (res: ApiResponse<ChartData[]>) => res.data
        }),
    })
});

export const {
    useGetNotificationsSLOQuery,
    useGetVendorsSLOQuery,
    useGetNotificationsQuery,
    useGetNotificationCostsQuery,
} = analyticsApi;