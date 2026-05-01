import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  getIngredientsApi
);
