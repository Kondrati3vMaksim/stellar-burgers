import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';
type TIngredientState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientState = {
  items: [],
  isLoading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка';
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
