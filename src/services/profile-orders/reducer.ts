import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type profileOrder = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: profileOrder = {
  orders: [],
  isLoading: false,
  error: null
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileOrdersRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    profileOrdersSuccess(state, action: PayloadAction<TOrder[]>) {
      state.isLoading = false;
      state.orders = action.payload;
    },
    profileOrdersError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  profileOrdersRequest,
  profileOrdersSuccess,
  profileOrdersError
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
