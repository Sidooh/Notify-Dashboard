import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONFIG } from 'config';
import { Notification, Setting } from '../../utils/types';
import { ApiResponse } from '@nabcellent/sui-react';

export const settingsApi = createApi({
    reducerPath: 'settingsApi',
    keepUnusedDataFor: 60 * 5, // 5 minutes
    tagTypes: [
        'Setting'
    ],
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.sidooh.services.notify.api.url}/settings`,
        prepareHeaders: (headers) => {
            const auth = JSON.parse(localStorage.getItem('auth') || '{}');

            if (auth.token) headers.set('Authorization', `Bearer ${auth.token}`);

            return headers;
        }
    }),
    endpoints: builder => ({
        settings: builder.query<Setting[], void>({
            query: () => '',
            providesTags: ['Setting'],
            transformResponse: (response: ApiResponse<Setting[]>) => response.data,
        }),
        upsertSetting: builder.mutation<Setting, Partial<Setting>>({
            query: setting => ({
                url: '',
                method: 'POST',
                body: setting
            }),
            invalidatesTags: ['Setting']
        }),
        deleteSetting: builder.mutation<void, string>({
            query: id => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Setting']
        })
    })
});

export const {
    useSettingsQuery,
    useUpsertSettingMutation,
    useDeleteSettingMutation
} = settingsApi;