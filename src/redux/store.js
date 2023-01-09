import { configureStore } from '@reduxjs/toolkit';
import { auth } from './auth/authSlice';
import { transactions } from './transactions/transactionsSlice';

export const store = configureStore({
  reducer: {
    auth: auth.reducer,
    transactions: transactions.reducer,
  },
});
