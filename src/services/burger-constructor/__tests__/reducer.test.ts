import {
  burgerConstructorReducer,
  addIngredient,
  removeIngredient,
  setBun,
  moveIngredient,
  clearConstructor
} from '../reducer';

const mockBun = {
  _id: 'bun1',
  name: 'Тестовая булка',
  type: 'bun',
  price: 100,
  image: '',
  image_large: '',
  image_mobile: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0
};

const mockIngredient = {
  _id: 'ing1',
  id: 'uuid-1',
  name: 'Тестовая начинка',
  type: 'main',
  price: 50,
  image: '',
  image_large: '',
  image_mobile: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0
};

const mockIngredient2 = {
  _id: 'ing2',
  id: 'uuid-2',
  name: 'Вторая начинка',
  type: 'main',
  price: 75,
  image: '',
  image_large: '',
  image_mobile: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0
};

describe('burgerConstructor reducer', () => {
  test('добавление ингредиента', () => {
    const state = burgerConstructorReducer(
      undefined,
      addIngredient(mockIngredient)
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(mockIngredient);
  });

  test('удаление ингредиента', () => {
    const initialState = {
      bun: null,
      ingredients: [mockIngredient, mockIngredient2]
    };
    const state = burgerConstructorReducer(initialState, removeIngredient(0));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(mockIngredient2);
  });

  test('изменение порядка ингредиентов', () => {
    const initialState = {
      bun: null,
      ingredients: [mockIngredient, mockIngredient2]
    };
    const state = burgerConstructorReducer(
      initialState,
      moveIngredient({ from: 0, to: 1 })
    );
    expect(state.ingredients[0]).toEqual(mockIngredient2);
    expect(state.ingredients[1]).toEqual(mockIngredient);
  });

  test('добавление булки', () => {
    const state = burgerConstructorReducer(undefined, setBun(mockBun));
    expect(state.bun).toEqual(mockBun);
  });

  test('очистка конструктора', () => {
    const initialState = {
      bun: mockBun,
      ingredients: [mockIngredient]
    };
    const state = burgerConstructorReducer(initialState, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
