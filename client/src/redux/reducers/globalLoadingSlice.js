import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const globalLoadingSlice = createSlice({
  name: 'globalLoading',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, stopLoading } = globalLoadingSlice.actions;
export default globalLoadingSlice.reducer;