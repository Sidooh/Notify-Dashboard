import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authAPI, LoginRequest} from './authAPI';

//  Get user from localstorage
const user = JSON.parse(String(localStorage.getItem('user')));

export interface AuthState {
    user: string | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState: AuthState = {
    user: user || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const login = createAsyncThunk('auth/login', async (user: LoginRequest, thunkAPI) => {
    try {
        return await authAPI.login(user);
    } catch (err) {
        const message = err.response?.data.errors[0].message ||
            (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString();

        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await authAPI.logout();
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, state => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = String(action.payload);
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    }
});

export const {reset} = authSlice.actions;

export default authSlice.reducer;