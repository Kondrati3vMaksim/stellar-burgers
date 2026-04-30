import { RootState } from '../store';
import { TIngredient } from '@utils-types';
export const getIsLoading = (state: RootState) => state.ingredients.isLoading;
export const getError = (state: RootState) => state.ingredients.error;
export const getItems = (state: RootState) => state.ingredients.items;
export const getBuns = (state: RootState) =>
  state.ingredients.items.filter((ex: TIngredient) => ex.type === 'bun');
export const getMains = (state: RootState) =>
  state.ingredients.items.filter((ex: TIngredient) => ex.type === 'main');
export const getSauces = (state: RootState) =>
  state.ingredients.items.filter((ex: TIngredient) => ex.type === 'sauce');
