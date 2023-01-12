import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTransactionsSummary = createAsyncThunk(
  'categories/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/transactions-summary');
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTransactionsSummaryOfPeriod = createAsyncThunk(
  'categories/fetchOfMonth',
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/transactions-summary?month=${month}&year=${year}`
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
