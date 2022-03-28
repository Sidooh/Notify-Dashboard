import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import {accountsApi} from '../features/accounts/accountsAPI';
import {notificationsApi} from '../features/notifications/notificationsAPI';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,

        [accountsApi.reducerPath]: accountsApi.reducer,
        [notificationsApi.reducerPath]: notificationsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(accountsApi.middleware, notificationsApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
