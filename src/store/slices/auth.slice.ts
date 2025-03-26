import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@/lib/interfaces';
import { publicApi } from '@/lib/axios';

interface AuthState {
    user: IUser | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    const response = await publicApi.post('/login', { email, password });
    if (response.status !== 200) {
        return rejectWithValue(response.data.error || 'Login failed');
    }
    return response.data;
});


const createTokenFromUser = (user: IUser) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));

    const payload = btoa(JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 86400
    }));

    const signature = btoa('signature');
    return `${header}.${payload}.${signature}`;
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state: AuthState) => {
            state.user = null;
            state.error = null;
            document.cookie = 'token=; path=/; max-age=0; secure; samesite=strict';
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(login.pending, (state: AuthState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state: AuthState, action: { payload: IUser }) => {
                state.isLoading = false;
                state.user = action.payload;

                window.localStorage.setItem('user', JSON.stringify(action.payload));

                const token = createTokenFromUser(action.payload);

                document.cookie = `token=${token}; path=/; max-age=86400; secure; samesite=strict`;
            })
            .addCase(login.rejected, (state: AuthState, action: { error: { message?: string } }) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer; 