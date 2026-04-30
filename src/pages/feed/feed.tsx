import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getFeeds } from '../../services/feed/actions';
import { getOrders } from '../../services/feed';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);
  if (!orders.length) {
    return <Preloader />;
  }
  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
