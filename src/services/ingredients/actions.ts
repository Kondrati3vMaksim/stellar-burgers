import {
  ingredientsRequest,
  ingredientsSuccess,
  ingredientsError
} from './reducer';

import { getIngredientsApi } from '../../utils/burger-api';
import { AppDispatch } from '../store';

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch(ingredientsRequest());
  getIngredientsApi()
    .then((data) => {
      dispatch(ingredientsSuccess(data));
    })
    .catch((err) => {
      dispatch(ingredientsError(err.message));
    });
};
