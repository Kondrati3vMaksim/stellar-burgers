import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../ingredients/reducer';
import { feedReducer } from '../feed/reducer';
import { userReducer } from '../user/reducer';
import { burgerConstructorReducer } from '../burger-constructor/reducer';
import { orderReducer } from '../order/reducer';
import { profileOrdersReducer } from '../profile-orders/reducer';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  feed: feedReducer,
  order: orderReducer,
  profileOrders: profileOrdersReducer
});

test('rootReducer правильно инициализируется', () => {
  const state = rootReducer(undefined, { type: '@@INIT' });

  expect(state).toHaveProperty('ingredients');
  expect(state).toHaveProperty('burgerConstructor');
  expect(state).toHaveProperty('user');
  expect(state).toHaveProperty('feed');
  expect(state).toHaveProperty('order');
  expect(state).toHaveProperty('profileOrders');
});
