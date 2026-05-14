import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getProfileOrdersList,
  getProfileOrders
} from '../../services/profile-orders';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders = useSelector(getProfileOrdersList);
  useEffect(() => {
    dispatch(getProfileOrders());
  }, [dispatch]);
  return <ProfileOrdersUI orders={orders} />;
};
