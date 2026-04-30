import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderRequest(state) {
      state.orderRequest = true;
    },
    orderSuccess(state, action: PayloadAction<TOrder>) {
      state.orderRequest = false;
      state.orderModalData = action.payload;
    },
    orderError(state, action: PayloadAction<string>) {
      state.orderRequest = false;
      state.error = action.payload;
    },
    closeOrder(state) {
      state.orderModalData = null;
    }
  }
});

export const { orderRequest, orderSuccess, orderError, closeOrder } =
  orderSlice.actions;
export const orderReducer = orderSlice.reducer;
