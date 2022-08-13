import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { NotificationType, SettingType } from 'utils/types';
import { RootState } from 'app/store';

export const notificationsApi = createApi({
    reducerPath: 'notificationsApi',
    keepUnusedDataFor: 60 * 5, // Five minutes
    tagTypes: ['Notification', 'Setting'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.notify.api.url}`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.auth?.token;

            if (token) headers.set('authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints: (builder) => ({
        //  Dashboard Endpoints
        getDashboard: builder.query<any, void>({
            query:() => '/dashboard',
        }),

        //  Notification Endpoints
        notifications: builder.query<NotificationType[], void>({
            query: () => '/notifications',
            providesTags: ['Notification']
        }),
        notification: builder.query<NotificationType, string>({
            query: id => `/notifications/${id}?with_notifiables=true`,
            providesTags: ['Notification']
        }),
        storeNotification: builder.mutation<NotificationType, {
            channel: string, event_type: string; destination: string[], content: string
        }>({
            query: notification => ({
                url: '/notifications',
                method: 'POST',
                body: notification
            })
        }),

        //  Settings Endpoints
        settings: builder.query<SettingType[], void>({
            query: () => '/settings',
            providesTags: ['Setting']
        }),
        upsertSetting: builder.mutation<SettingType, SettingType>({
            query: setting => ({
                url: '/settings',
                method: 'POST',
                body: setting
            }),
            invalidatesTags: ['Setting']
        }),
        deleteSetting: builder.mutation<void, string>({
            query: id => ({
                url: `/settings/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Setting']
        })
    })
});

export const {
    useGetDashboardQuery,

    useNotificationsQuery,
    useNotificationQuery,
    useStoreNotificationMutation,

    useSettingsQuery,
    useUpsertSettingMutation,
    useDeleteSettingMutation
} = notificationsApi;