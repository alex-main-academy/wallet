import { createSlice } from '@reduxjs/toolkit';

const translationSlice = createSlice({
  name: 'translation',
  initialState: '1',
  reducers: {
    setLanguage(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setLanguage } = translationSlice.actions;
export const translationReducer = translationSlice.reducer;
