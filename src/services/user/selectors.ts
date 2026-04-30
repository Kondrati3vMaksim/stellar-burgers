import { RootState } from '../store';

export const getUser = (state: RootState) => state.user.data;
export const getIsAuthChecked = (state: RootState) => state.user.isAuthChecked;
export const getIsLoading = (state: RootState) => state.user.isLoading;
export const getError = (state: RootState) => state.user.error;
