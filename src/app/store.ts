import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import themeReducer from 'features/theme/themeSlice';
import { accountsApi } from '../features/accounts/accountsAPI';
import { notificationsApi } from 'features/notifications/notificationsAPI';
import { dashboardApi } from 'features/dashboard/dashboardApi';
import { settingsApi } from 'features/settings/settingsApi';
import { smsProvidersApi } from 'features/sms-providers/smsProviderApi';
import { mailsApi } from '../features/mails/mailsApi';
import { analyticsApi } from "../features/analytics/analyticsApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,

        [accountsApi.reducerPath]: accountsApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [analyticsApi.reducerPath]: analyticsApi.reducer,
        [notificationsApi.reducerPath]: notificationsApi.reducer,
        [smsProvidersApi.reducerPath]: smsProvidersApi.reducer,
        [settingsApi.reducerPath]: settingsApi.reducer,
        [mailsApi.reducerPath]: mailsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(
            accountsApi.middleware,
            dashboardApi.middleware,
            analyticsApi.middleware,
            notificationsApi.middleware,
            settingsApi.middleware,
            smsProvidersApi.middleware,
            mailsApi.middleware,
        )
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
