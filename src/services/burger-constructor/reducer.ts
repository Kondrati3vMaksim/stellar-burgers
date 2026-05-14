import { TIngredient, TConstructorIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructor = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients.splice(action.payload, 1);
    },
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredient(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const [moved] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, moved);
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  setBun,
  clearConstructor,
  moveIngredient
} = burgerConstructor.actions;
export const burgerConstructorReducer = burgerConstructor.reducer;
