import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getOrders, getTotal, getTotalToday } from '../../services/feed';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrdersByStatus = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const orders = useSelector(getOrders);
  const total = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);

  const readyOrders = getOrdersByStatus(orders, 'done');

  const pendingOrders = getOrdersByStatus(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
