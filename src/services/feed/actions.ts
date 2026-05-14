import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { getOrderByNumberApi } from '../../utils/burger-api';

export const getFeeds = createAsyncThunk('feed/get', getFeedsApi);
export const getOrderByNumber = createAsyncThunk(
  'feed/getOrder',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res.orders[0];
  }
);
