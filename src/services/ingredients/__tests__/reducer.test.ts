import { ingredientsReducer } from '../reducer';
import { getIngredients } from '../actions';

const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  price: 1255,
  image: '',
  image_large: '',
  image_mobile: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0
};

describe('ingredients reducer', () => {
  test('pending меняет isLoading на true', () => {
    const state = ingredientsReducer(undefined, {
      type: getIngredients.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  test('fulfilled записывает данные и меняет isLoading На false', () => {
    const state = ingredientsReducer(undefined, {
      type: getIngredients.fulfilled.type,
      payload: [mockIngredient]
    });
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual([mockIngredient]);
  });

  test('rejected записывает ошибку и меня isLoading на false', () => {
    const state = ingredientsReducer(undefined, {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
