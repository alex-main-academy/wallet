import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'https://wallet.goit.ua/api';

// запит на всі транзакції для таблиці
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios('/api/transactions');

        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  //додавання транзакції
export const addTransaction = createAsyncThunk(
    'transaction/addTransaction',
    async (transaction, { rejectWithValue }) => {
      try {
        const { data } = await axios.post('/api/transactions', transaction);
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  //видалення транзакції
  export const deleteTransaction = createAsyncThunk(
    'transaction/deleteTransaction',
    async (id, { rejectWithValue }) => {
      try {
        await axios.delete(`/api/transactions/${id}`);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  //категорії
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

    //статистика
  export const fetchTransactionsSummary = createAsyncThunk(
    'categories/fetch',
    async (_, thunkAPI) => {
      try {
        const {data} = await axios.get('/api/transactions-summary');
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  export const fetchTransactionsSummaryOfPeriod = createAsyncThunk(
    'categories/fetchOfMonth',
    async ({ month, year }, thunkAPI) => {
      try {
        const {data} = await axios.get(
          `/api/transactions-summary?month=${month}&year=${year}`
        );
        return data;
      } catch (error) {
        
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  

