import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

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
  reducers: {
    ingredientsRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    ingredientsSuccess(state, action: PayloadAction<TIngredient[]>) {
      state.isLoading = false;
      state.items = action.payload;
    },
    ingredientsError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { ingredientsRequest, ingredientsSuccess, ingredientsError } =
  ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;
