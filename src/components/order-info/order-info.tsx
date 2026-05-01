import { FC, useMemo, useEffect, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';
import { getOrders } from '../../services//feed';
import { getProfileOrdersList } from '../../services/profile-orders';
import { useSelector } from '../../services/store';
import { getItems } from '../../services/ingredients';
import { getOrderByNumberApi } from '../../utils/burger-api';
export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();
  const feedOrders = useSelector(getOrders);
  const profileOrders = useSelector(getProfileOrdersList);
  const ingredients: TIngredient[] = useSelector(getItems);

  const [loadedOrder, setLoadedOrder] = useState<TOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const orderData =
    [...feedOrders, ...profileOrders].find(
      (order) => order.number === Number(number)
    ) || loadedOrder;

  useEffect(() => {
    if (!orderData) {
      setIsLoading(true);
      getOrderByNumberApi(Number(number))
        .then((res) => {
          setLoadedOrder(res.orders[0]);
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }
  }, [number, orderData]);
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

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
