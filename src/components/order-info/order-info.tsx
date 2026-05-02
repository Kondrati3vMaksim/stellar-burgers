import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import {
  getCurrentOrder,
  getOrderByNumber,
  getOrders,
  getIsLoading
} from '../../services//feed';
import { getProfileOrdersList } from '../../services/profile-orders';
import { useDispatch, useSelector } from '../../services/store';
import { getItems } from '../../services/ingredients';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();
  const feedOrders = useSelector(getOrders);
  const profileOrders = useSelector(getProfileOrdersList);
  const ingredients: TIngredient[] = useSelector(getItems);
  const dispatch = useDispatch();
  const currentOrder = useSelector(getCurrentOrder);
  const isLoading = useSelector(getIsLoading);

  const orderData =
    [...feedOrders, ...profileOrders].find(
      (order) => order.number === Number(number)
    ) || currentOrder;

  useEffect(() => {
    if (!orderData && !currentOrder) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [number, orderData, currentOrder, dispatch]);
  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading) {
    return <Preloader />;
  }
  if (!orderData) {
    return <p style={{ textAlign: 'center' }}>Заказ не найден</p>;
  }

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
