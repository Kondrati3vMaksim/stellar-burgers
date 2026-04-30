import { TUser } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TUserState = {
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
  data: TUser | null;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isLoading: false,
  error: null,
  data: null
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess(state, action: PayloadAction<TUser>) {
      state.isLoading = false;
      state.data = action.payload;
    },
    authError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    authChecked(state) {
      state.isAuthChecked = true;
    },
    logout(state) {
      state.data = null;
    }
  }
});

export const { authRequest, authSuccess, authError, authChecked, logout } =
  usersSlice.actions;
export const userReducer = usersSlice.reducer;
