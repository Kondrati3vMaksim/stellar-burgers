import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';

export const getProfileOrders = createAsyncThunk(
  'profileOrders/get',
  getOrdersApi
);
