import { TOrder } from '@utils-types';
import { TFeedsResponse } from '../../utils/burger-api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {
    feedRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    feedSuccess(state, action: PayloadAction<TFeedsResponse>) {
      state.isLoading = false;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    feedError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { feedRequest, feedSuccess, feedError } = feedOrderState.actions;
export const feedReducer = feedOrderState.reducer;
