import { RootState } from '../store';
import { TIngredient } from '@utils-types';
import { createSelector } from '@reduxjs/toolkit';

export const getIsLoading = (state: RootState) => state.ingredients.isLoading;
export const getError = (state: RootState) => state.ingredients.error;
export const getItems = (state: RootState) => state.ingredients.items;

export const getBuns = createSelector(getItems, (items) =>
  items.filter((item: TIngredient) => item.type === 'bun')
);

export const getMains = createSelector(getItems, (items) =>
  items.filter((item: TIngredient) => item.type === 'main')
);

export const getSauces = createSelector(getItems, (items) =>
  items.filter((item: TIngredient) => item.type === 'sauce')
);
