import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CONFIG} from '../../config';
import {Notification} from '../../utils/types';

export const notificationsApi = createApi({
    reducerPath: 'notificationsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.notify.api.url}`,
    }),
    endpoints: (builder) => ({
        notifications: builder.query<Notification[], void>({
            query: () => '/notifications'
        }),
        notification: builder.query<Notification, string>({
            query: id => `/notifications/${id}`
        })
    })
});

export const {useNotificationsQuery, useNotificationQuery} = notificationsApi;