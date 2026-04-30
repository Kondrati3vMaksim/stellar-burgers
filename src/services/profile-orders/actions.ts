import {
  profileOrdersRequest,
  profileOrdersSuccess,
  profileOrdersError
} from './reducer';

import { AppDispatch } from '../store';
import { getOrdersApi } from '../../utils/burger-api';

export const getProfileOrder = () => (dispatch: AppDispatch) => {
  dispatch(profileOrdersRequest());
  getOrdersApi()
    .then((res) => {
      dispatch(profileOrdersSuccess(res));
    })
    .catch((error) => dispatch(profileOrdersError(error.message)));
};
