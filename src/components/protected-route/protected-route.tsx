import { Navigate } from 'react-router-dom';

import { ProtectedRouteProps } from './type';
import { ReactNode, FC } from 'react';
import { useSelector } from '../../services/store';
import { getUser, getIsAuthChecked } from '../../services/user';
import { Preloader } from '@ui';
import { useLocation } from 'react-router-dom';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyForAuth
}) => {
  const isAuth = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const location = useLocation();
  if (isAuthChecked === false) {
    return <Preloader />;
  }
  if (onlyForAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (!onlyForAuth && isAuth) {
    return <Navigate to='/' />;
  }

  return children;
};
