import { Navigate } from 'react-router-dom';

import { ProtectedRouteProps } from './type';
import { ReactNode, FC } from 'react';
import { useSelector } from '../../services/store';
import { getUser, getIsAuthChecked } from '../../services/user';
import { Preloader } from '@ui';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyForAuth
}) => {
  const isAuth = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);
  if (onlyForAuth && !isAuth) {
    return <Navigate to='/login' />;
  }
  if (!onlyForAuth && isAuth) {
    return <Navigate to='/' />;
  }
  if (isAuthChecked === false) {
    return <Preloader />;
  }
  return children;
};
