import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';

export const getFeeds = createAsyncThunk('feed/get', getFeedsApi);
