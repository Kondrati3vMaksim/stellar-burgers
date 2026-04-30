import {
  ConstructorPage,
  Feed,
  NotFound404,
  Profile,
  ResetPassword,
  ForgotPassword,
  Login,
  Register,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { TModalProps } from '../modal/type';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useSelector, useDispatch } from '../../services/store';
import {
  getIsLoading,
  getError,
  getItems,
  getIngredients
} from '../../services/ingredients';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/user';

const App = () => {
  /** TODO: взять переменные из стора */
  const isIngredientsLoading = useSelector(getIsLoading);
  const ingredients = useSelector(getItems);
  const error = useSelector(getError);
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);
  const closeModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        {/*обычные */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        {/* только для гостей */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyForAuth={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyForAuth={false}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyForAuth={false}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyForAuth={false}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        {/* защищённые */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute onlyForAuth>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute onlyForAuth>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {/*Модальные маршруты*/}
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal onClose={closeModal} title='Информация о заказе'>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={closeModal} title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute onlyForAuth>
                <Modal onClose={closeModal} title='Информация о заказе'>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
