import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import casesReducer from './slices/cases.slice';
import documentsReducer from './slices/documents.slice';
import timeEntriesReducer from './slices/timeEntries.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cases: casesReducer,
    documents: documentsReducer,
    timeEntries: timeEntriesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 