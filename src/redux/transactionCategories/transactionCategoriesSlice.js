import { createSlice } from '@reduxjs/toolkit';
import { fetchTransactionCategories } from './transactionCategoriesOperations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const transactionCategoriesSlice = createSlice({
  name: 'transactionCategories',
  initialState,

  extraReducers: {
    [fetchTransactionCategories.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchTransactionCategories.fulfilled]: (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchTransactionCategories.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const { transactionCategoriesAction } =
  transactionCategoriesSlice.actions;
export default transactionCategoriesSlice.reducer;