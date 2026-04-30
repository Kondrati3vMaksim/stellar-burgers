import { RootState } from '../store';

export const getProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const getProfileIsLoading = (state: RootState) =>
  state.profileOrders.isLoading;
export const getProfileError = (state: RootState) => state.profileOrders.error;
