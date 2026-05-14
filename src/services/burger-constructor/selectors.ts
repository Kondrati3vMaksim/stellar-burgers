import { RootState } from '../store';

export const getConstructorItems = (state: RootState) =>
  state.burgerConstructor;
