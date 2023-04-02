import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { Notification } from 'utils/types';
import { ApiResponse, RawAnalytics } from "@nabcellent/sui-react";

type DashboardSummariesData = {
    default_sms_provider: string
    total_notifications: number
    total_notifications_today: number
    sms_costs: number
    sms_costs_today: number
}
type ProvidersBalancesData = {
    wavesms_balance: number
    africastalking_balance: number,
    websms_balance: number
}

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    keepUnusedDataFor: 60 * 5, // 5 minutes
    tagTypes: [
        'DashboardChart',
        'DashboardSummaries',
        'Notification'
    ],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.notify.api.url}/dashboard`,
        prepareHeaders: (headers) => {
            const auth = JSON.parse(localStorage.getItem('auth') || '{}');

            if (auth.token) headers.set('Authorization', `Bearer ${auth.token}`);

            return headers;
        }
    }),
    endpoints: builder => ({
        //  Earning Endpoints
        getDashboardChartData: builder.query<RawAnalytics[], void>({
            query: () => '/chart',
            transformResponse: (response: { data: RawAnalytics[] }) => response.data,
            providesTags: ['DashboardChart']
        }),
        getDashboardSummaries: builder.query<DashboardSummariesData, void>({
            query: () => '/summaries',
            transformResponse: (response: { data: DashboardSummariesData }) => response.data,
            providesTags: ['DashboardSummaries']
        }),
        getRecentNotifications: builder.query<Notification[], void>({
            query: () => '/recent-notifications',
            transformResponse: (response: { data: Notification[] }) => response.data,
            providesTags: ['Notification']
        }),
        getProvidersBalances: builder.query<ProvidersBalancesData, void>({
            query: () => '/providers/balances',
            transformResponse: (response: ApiResponse<ProvidersBalancesData>) => response.data
        })
    })
});

export const {
    useGetDashboardChartDataQuery,
    useGetDashboardSummariesQuery,
    useGetRecentNotificationsQuery,
    useGetProvidersBalancesQuery
} = dashboardApi;