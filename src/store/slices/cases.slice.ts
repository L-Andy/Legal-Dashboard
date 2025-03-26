import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ICase } from '@/lib/interfaces';
import { authApi } from '../../lib/axios';

interface CasesState {
    items: ICase[];
    selectedCase: ICase | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: CasesState = {
    items: [],
    selectedCase: null,
    isLoading: false,
    error: null,
};

export const fetchCases = createAsyncThunk('cases/fetchCases', async (_, { rejectWithValue }) => {
    try {
        const response = await authApi.get('/cases');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || 'Failed to fetch cases');
    }
});

export const createCase = createAsyncThunk('cases/createCase', async (newCase: Omit<ICase, 'id'>, { rejectWithValue }) => {
    try {
        const response = await authApi.post('/cases', newCase);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || 'Failed to create case');
    }
});

export const updateCase = createAsyncThunk('cases/updateCase', async ({ id, updates }: { id: string; updates: Partial<ICase> }, { rejectWithValue }) => {
    try {
        const response = await authApi.put(`/cases/${id}`, updates);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || 'Failed to update case');
    }
});

export const deleteCase = createAsyncThunk('cases/deleteCase', async (id: string, { rejectWithValue }) => {
    try {
        await authApi.delete(`/cases/${id}`);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || 'Failed to delete case');
    }
});

const casesSlice = createSlice({
    name: 'cases',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCases.pending, (state: CasesState) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCases.fulfilled, (state: CasesState, action: { payload: ICase[] }) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchCases.rejected, (state: CasesState, action: { error: { message?: string } }) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch cases';
            })

            .addCase(createCase.pending, (state: CasesState) => {
                state.error = null;
            })
            .addCase(createCase.fulfilled, (state: CasesState, action: { payload: ICase }) => {
                state.items = [...state.items, action.payload];
            })
            .addCase(createCase.rejected, (state: CasesState, action: { error: { message?: string } }) => {
                state.error = action.error.message || 'Failed to create case';
            })

            .addCase(updateCase.pending, (state: CasesState) => {
                state.error = null;
            })
            .addCase(updateCase.fulfilled, (state: CasesState, action: { payload: ICase }) => {
                const index = state.items.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                if (state.selectedCase?.id === action.payload.id) {
                    state.selectedCase = action.payload;
                }
            })
            .addCase(updateCase.rejected, (state: CasesState, action: { error: { message?: string } }) => {
                state.error = action.error.message || 'Failed to update case';
            })

            .addCase(deleteCase.pending, (state: CasesState) => {
                state.error = null;
            })
            .addCase(deleteCase.fulfilled, (state: CasesState, action: { payload: string }) => {
                state.items = state.items.filter(c => c.id !== action.payload);
            })
            .addCase(deleteCase.rejected, (state: CasesState, action: { error: { message?: string } }) => {
                state.error = action.error.message || 'Failed to delete case';
            })
    },
});

export default casesSlice.reducer; 