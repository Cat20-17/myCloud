import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { fetchFiles } from '../../services/fileService';

export const getFiles = createAsyncThunk('user/setFiles',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      return await fetchFiles();
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: null,
  },
  extraReducers: (builder) => {
    builder
      // .addCase(setFiles.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.files = action.payload;
      })
      .addCase(getFiles.rejected, (state, action) => {
        console.log('error from files', action.payload);
        // state.error = action.payload;
      });
  },

});

export default filesSlice.reducer;