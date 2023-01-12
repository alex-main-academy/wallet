import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTransactionCategories = createAsyncThunk(
  'transactionCategories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios('/api/transaction-categories');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);