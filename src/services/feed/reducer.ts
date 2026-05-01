import { TOrder } from '@utils-types';
import { getFeeds } from './actions';
import { createSlice } from '@reduxjs/toolkit';

type TFeedState = {
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: null,
  totalToday: null,
  isLoading: false,
  error: null
};

const feedOrderState = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка';
      });
  }
});

export const feedReducer = feedOrderState.reducer;
