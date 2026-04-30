import { orderBurgerApi } from '../../utils/burger-api';
import { AppDispatch } from '../store';
import { orderRequest, orderSuccess, orderError } from './reducer';

export const createOrder = (data: string[]) => (dispatch: AppDispatch) => {
  dispatch(orderRequest());
  orderBurgerApi(data)
    .then((res) => {
      dispatch(orderSuccess({ ...res.order, ingredients: data }));
    })
    .catch((err) => {
      dispatch(orderError(err.message));
    });
};
