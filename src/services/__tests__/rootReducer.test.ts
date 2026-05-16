import { rootReducer } from '../store';

import { initialState as ingredientsInitialState } from '../ingredients/reducer';
import { initialState as burgerConstructorInitialState } from '../burger-constructor/reducer';
import { initialState as feedInitialState } from '../feed/reducer';
import { initialState as orderInitialState } from '../order/reducer';
import { initialState as profileOrdersInitialState } from '../profile-orders/reducer';

describe('rootReducer', () => {
  test('возвращение корректного начального состояния при неизвестном экшене', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state.ingredients).toStrictEqual(ingredientsInitialState);
    expect(state.burgerConstructor).toStrictEqual(
      burgerConstructorInitialState
    );
    expect(state.feed).toStrictEqual(feedInitialState);
    expect(state.order).toStrictEqual(orderInitialState);
    expect(state.profileOrders).toStrictEqual(profileOrdersInitialState);

    // Для user слайса — проверяем только структуру, потому что userReducer
    // может не экспортировать initialState напрямую
    expect(state).toHaveProperty('user');
    expect(state.user).toHaveProperty('isAuthChecked');
    expect(state.user).toHaveProperty('isLoading');
    expect(state.user).toHaveProperty('error');
    expect(state.user).toHaveProperty('data');
  });
});
