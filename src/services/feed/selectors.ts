import { RootState } from '../store';

export const getOrders = (state: RootState) => state.feed.orders;
export const getTotal = (state: RootState) => state.feed.total;
export const getTotalToday = (state: RootState) => state.feed.totalToday;
export const getIsLoading = (state: RootState) => state.feed.isLoading;
export const getError = (state: RootState) => state.feed.error;
