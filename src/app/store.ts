import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/theme/themeSlice';
import { accountsApi } from './services/accountsAPI';
import { notificationsApi } from '../features/notifications/notificationsAPI';
import { dashboardApi } from '../features/dashboard/dashboardApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,

        [accountsApi.reducerPath]: accountsApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [notificationsApi.reducerPath]: notificationsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(accountsApi.middleware, dashboardApi.middleware, notificationsApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
