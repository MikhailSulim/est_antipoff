import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authApi from '../utils/authApi';


interface LoginUserPayload {
    email: string;
    password: string;
}


export const loginUser = createAsyncThunk<{ token: string }, LoginUserPayload, { rejectValue: { message: string } }>('auth/loginUser', async (payload, { rejectWithValue }) => {
    try {
        const response = await authApi.authorize(payload.email, payload.password);
        return response;
    } catch (error: any) {
        if (error.response && error.response.data) {
            alert(error.response.data.message)
            return rejectWithValue({ message: error.response.data.message });
        } else {
            alert("Неправильный email или пароль")
            return rejectWithValue({ message: 'Неправильный email или пароль' });
        }
    }
});

interface AuthState {
    isLoggedIn: boolean,
    auth_token: null | string,
    isLoading: boolean,
    error: null | string | undefined,
}

const initialState: AuthState = {
    isLoggedIn: false,
    auth_token: null,
    isLoading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.auth_token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) =>
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;

        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.auth_token = action.payload.token;
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.message;
        }),

});

export const { logoutUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
