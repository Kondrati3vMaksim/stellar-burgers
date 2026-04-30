import { feedRequest, feedSuccess, feedError } from './reducer';

import { getFeedsApi } from '../../utils/burger-api';
import { AppDispatch } from '../store';

export const getFeeds = () => (dispatch: AppDispatch) => {
  dispatch(feedRequest());
  getFeedsApi()
    .then((data) => {
      dispatch(feedSuccess(data));
    })
    .catch((err) => {
      dispatch(feedError(err.message));
    });
};
