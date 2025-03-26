import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IDocument } from '@/lib/interfaces';
import { authApi } from '@/lib/axios';

interface DocumentsState {
  items: IDocument[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DocumentsState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async (_, { rejectWithValue }) => {
  try {
    const response = await authApi.get('/documents');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || 'Failed to fetch documents');
  }
});

export const deleteDocument = createAsyncThunk('documents/deleteDocument', async (id: string, { rejectWithValue }) => {
  try {
    await authApi.delete(`/documents/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || 'Failed to delete document');
  }
});

export const createDocument = createAsyncThunk('documents/createDocument', async (document: Omit<IDocument, 'id'>, { rejectWithValue }) => {
  try {
    const response = await authApi.post('/documents', document);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || 'Failed to create document');
  }
});

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state: DocumentsState) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state: DocumentsState, action: { payload: IDocument[] }) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state: DocumentsState, action: { error: { message?: string } }) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch documents';
      })
      .addCase(deleteDocument.pending, (state: DocumentsState) => {
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state: DocumentsState, action: { payload: string }) => {
        state.items = state.items.filter(doc => doc.id !== action.payload);
      })
      .addCase(deleteDocument.rejected, (state: DocumentsState, action: { error: { message?: string } }) => {
        state.error = action.error.message || 'Failed to delete document';
      })
      .addCase(createDocument.pending, (state: DocumentsState) => {
        state.error = null;
      })
      .addCase(createDocument.fulfilled, (state: DocumentsState, action: { payload: IDocument }) => {
        state.items = [...state.items, action.payload];
      })
      .addCase(createDocument.rejected, (state: DocumentsState, action: { error: { message?: string } }) => {
        state.error = action.error.message || 'Failed to create document';
      });
  },
});

export default documentsSlice.reducer; 