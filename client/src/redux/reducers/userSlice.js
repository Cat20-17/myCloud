import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;