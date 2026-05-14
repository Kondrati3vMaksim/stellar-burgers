import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './ingredients/reducer';
import { userReducer } from './user/reducer';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerConstructorReducer } from './burger-constructor';
import { feedReducer } from './feed/reducer';
import { orderReducer } from './order';
import { profileOrdersReducer } from './profile-orders';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  feed: feedReducer,
  order: orderReducer,
  profileOrders: profileOrdersReducer
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
