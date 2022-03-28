import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CONFIG} from '../../config';
import {NotificationType, SettingType} from '../../utils/types';

export const notificationsApi = createApi({
    reducerPath: 'notificationsApi',
    keepUnusedDataFor: 60 * 5, // Five minutes
    tagTypes: ['Notification', 'Setting'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.notify.api.url}`,
    }),
    endpoints: (builder) => ({
        notifications: builder.query<NotificationType[], void>({
            query: () => '/notifications',
            providesTags: ['Notification']
        }),
        notification: builder.query<NotificationType, string>({
            query: id => `/notifications/${id}`,
            providesTags: ['Notification']
        }),
        settings: builder.query<SettingType[], void>({
            query: () => '/settings',
            providesTags: ['Setting']
        }),
        upsertSetting: builder.mutation<void, SettingType>({
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
    useNotificationsQuery,
    useNotificationQuery,
    useSettingsQuery,
    useUpsertSettingMutation,
    useDeleteSettingMutation
} = notificationsApi;