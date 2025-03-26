import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ITimeEntry } from '@/lib/interfaces';
import { authApi } from '@/lib/axios';

interface TimeEntriesState {
  items: ITimeEntry[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TimeEntriesState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchTimeEntries = createAsyncThunk('timeEntries/fetchTimeEntries', async (_, { rejectWithValue }) => {
  try {
    const response = await authApi.get('/time-tracking');
    if (response.status !== 200) {
      throw new Error('Failed to fetch time entries');
    }
    const data = await response.data;
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteTimeEntry = createAsyncThunk('timeEntries/deleteTimeEntry', async (id: string, { rejectWithValue }) => {
  try {
    const response = await authApi.delete(`/time-tracking/${id}`);
    if (response.status !== 200) {
      throw new Error('Failed to delete time entry');
    }
    return id;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createTimeEntry = createAsyncThunk('timeEntries/createTimeEntry', async (timeEntry: Omit<ITimeEntry, 'id'>, { rejectWithValue }) => {
  try {
    const response = await authApi.post('/time-tracking', timeEntry);
    if (response.status !== 200) {
      throw new Error('Failed to create time entry');
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});


const timeEntriesSlice = createSlice({
  name: 'timeEntries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeEntries.pending, (state: TimeEntriesState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTimeEntries.fulfilled, (state: TimeEntriesState, action: { payload: ITimeEntry[] }) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTimeEntries.rejected, (state: TimeEntriesState, action: { error: { message?: string } }) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch time entries';
      })
      .addCase(deleteTimeEntry.pending, (state: TimeEntriesState) => {
        state.error = null;
      })
      .addCase(deleteTimeEntry.fulfilled, (state: TimeEntriesState, action: { payload: string }) => {
        state.items = state.items.filter((item: ITimeEntry) => item.id !== action.payload);
      })
      .addCase(deleteTimeEntry.rejected, (state: TimeEntriesState, action: { error: { message?: string } }) => {
        state.error = action.error.message || 'Failed to delete time entry';
      })
      .addCase(createTimeEntry.pending, (state: TimeEntriesState) => {
        state.error = null;
      })
      .addCase(createTimeEntry.fulfilled, (state: TimeEntriesState, action: { payload: ITimeEntry }) => {
        console.log('action.payload', action.payload);
        state.items = [...state.items, action.payload];
      })
      .addCase(createTimeEntry.rejected, (state: TimeEntriesState, action: { error: { message?: string } }) => {
        state.error = action.error.message || 'Failed to create time entry';
      });
  },
});

export default timeEntriesSlice.reducer; 