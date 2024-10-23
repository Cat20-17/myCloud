import { combineReducers } from 'redux';
import authReducer from './authSlice';
import userReducer from './userSlice';
import filesSlice from './filesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  files: filesSlice,
});

export default rootReducer;