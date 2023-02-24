import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { Notification } from 'utils/types';

type DashboardSummariesData = {
    default_sms_provider: string
    sms_credits: {
        wavesms: number
        africastalking: number,
        websms: number
    }
    total_notifications: number
    total_notifications_today: number
}
type ChartData = {
    labels: string[],
    datasets: number[]
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
        getDashboardChartData: builder.query<ChartData, void>({
            query: () => '/chart',
            transformResponse: (response: { data: ChartData }) => response.data,
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
        })
    })
});

export const {
    useGetDashboardChartDataQuery,
    useGetDashboardSummariesQuery,
} = dashboardApi;