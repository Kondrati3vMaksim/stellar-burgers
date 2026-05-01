import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const createOrder = createAsyncThunk('order/create', (data: string[]) =>
  orderBurgerApi(data)
);
