import { authRequest, authSuccess, authError, authChecked } from './reducer';
import {
  getUserApi,
  loginUserApi,
  TLoginData,
  TRegisterData,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { AppDispatch } from '../store';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { logoutApi } from '../../utils/burger-api';
import { logout } from './reducer';

export const checkUserAuth = () => (dispatch: AppDispatch) => {
  dispatch(authRequest());
  getUserApi()
    .then((data) => {
      dispatch(authSuccess(data.user));
    })
    .catch((error) => {
      dispatch(authError(error.message));
    })
    .finally(() => {
      dispatch(authChecked());
    });
};

export const loginUser = (data: TLoginData) => (dispatch: AppDispatch) => {
  dispatch(authRequest());
  loginUserApi(data)
    .then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(authSuccess(res.user));
    })
    .catch((err) => {
      dispatch(authError(err.message));
    });
};

export const registerUser =
  (data: TRegisterData) => (dispatch: AppDispatch) => {
    dispatch(authRequest());
    registerUserApi(data)
      .then((res) => {
        setCookie('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch(authSuccess(res.user));
      })
      .catch((err) => {
        dispatch(authError(err.message));
      });
  };

export const logoutUser = () => (dispatch: AppDispatch) => {
  logoutApi()
    .then(() => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logout());
    })
    .catch(() => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logout());
    });
};

export const updateUser =
  (data: Partial<TRegisterData>) => (dispatch: AppDispatch) => {
    updateUserApi(data)
      .then((res) => {
        dispatch(authSuccess(res.user));
      })
      .catch((err) => {
        dispatch(authError(err.message));
      });
  };
