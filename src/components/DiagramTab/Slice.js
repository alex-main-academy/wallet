import { createSlice } from '@reduxjs/toolkit';
import {fetchTransactionsSummary,fetchTransactionsSummaryOfPeriod} from "./operation"


const statisticSlice = createSlice({
    name: "statistic",
    initialState:{
        items: [],
        isLoading: false,
        error: null,
    },
    extraReducers:{
        [fetchTransactionsSummary.pending](state){
            state.isLoading = true
        },
        [fetchTransactionsSummary.fulfilled](state,action){
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
        },
        [fetchTransactionsSummary.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        [fetchTransactionsSummaryOfPeriod.pending](state){
            state.isLoading = true
        },
        [fetchTransactionsSummaryOfPeriod.fulfilled](state,action){
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
        },
        [fetchTransactionsSummaryOfPeriod.rejected](state, action){
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const statisticReducer = statisticSlice.reducer;