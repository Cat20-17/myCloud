import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, clearUser } from './userSlice';
import { login, register } from '../../services/authService';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, {rejectWithValue}) => {
    try {
      await register(credentials);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await login(credentials);
      const user = response.data.data;
      const token = response.headers['authorization'].split(' ')[1];

      dispatch(setUser(user));

      return { user, token };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      dispatch(logout());
      dispatch(clearUser());
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: localStorage.getItem('isAuthenticated') || false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('error from login', action.payload);
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
