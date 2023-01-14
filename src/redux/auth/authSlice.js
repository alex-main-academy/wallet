import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './authOperations';

const handleRejected = (state, action) => {
  state.error = 'Something went wrong. Check your email and password';
  state.isLoading = false;
};

const state = {
  user: { name: null, email: null, password: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
  isLoading: false,
};

export const auth = createSlice({
  name: 'auth',
  initialState: state,
  extraReducers: {
    [register.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
      state.isLoading = false;
    },
    [logIn.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
      state.isLoading = false;
    },
    [logIn.rejected]: handleRejected,
    [logOut.fulfilled](state) {
      state.user = { name: null, email: null, password: null };
      state.isLoggedIn = false;
      state.token = null;
    },
    [refreshUser.pending](state) {
      state.isRefreshing = true;
      state.isLoading = true;
    },
    [refreshUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
      state.error = null;
      state.isLoading = false;
    },
    [refreshUser.rejected](state) {
      state.isRefreshing = false;
      state.error = null;
      state.isLoading = false;
    },
  },
  reducers: {
    changeBalance(state, action) {
      state.user.balance = state.user.balance-action.payload;
    },
  },
});

export const {changeBalance} = auth.actions