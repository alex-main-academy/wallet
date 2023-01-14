import { createSlice } from '@reduxjs/toolkit';
import {
  addTransaction,
  fetchTransactions,
  deleteTransaction,
  fetchTransactionCategories,
  fetchTransactionsSummary,
  fetchTransactionsSummaryOfPeriod,
} from './transactionsOperations';

const initialState = {
  items: [],
  summaryItems: {
    categoriesSummary: [],
    incomeSummary: 0,
    expenseSummary: 0,
    periodTotal: 0,
    year: 0,
    month: 0,
  },
  isLoading: false,
  error: null,
  transactionCategories: {
    items: [],
  },
};

const transactionsSlice = createSlice({
  name: 'userTransactions',
  initialState,

  extraReducers: {
    [fetchTransactions.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchTransactions.fulfilled]: (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchTransactions.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    [addTransaction.pending]: state => {
      state.isLoading = true;
    },
    [addTransaction.fulfilled]: (state, { payload }) => {
      state.items = [...state.items, payload];
      state.isLoading = false;
      state.error = null;
    },
    [addTransaction.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    [deleteTransaction.pending]: state => {
      state.isLoading = true;
    },
    [deleteTransaction.fulfilled]: (state, { payload }) => {
      state.items = state.items.filter(({ id }) => id !== payload);
      state.isLoading = false;
    },
    [deleteTransaction.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    [fetchTransactionCategories.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchTransactionCategories.fulfilled]: (state, { payload }) => {
      state.transactionCategories.items = payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchTransactionCategories.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },

    [fetchTransactionsSummary.pending](state) {
      state.isLoading = true;
    },
    [fetchTransactionsSummary.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.summaryItems = action.payload;
    },
    [fetchTransactionsSummary.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [fetchTransactionsSummaryOfPeriod.pending](state) {
      state.isLoading = true;
    },
    [fetchTransactionsSummaryOfPeriod.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.summaryItems = action.payload;
    },
    [fetchTransactionsSummaryOfPeriod.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default transactionsSlice.reducer;
