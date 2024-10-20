import { fetchNewOrderHelper } from '@/helpers/fetchNewOrderHelper';
import useProfile from '@/hooks/useProfile';
import useProfileStore from '@/hooks/useProfileStore';
import { updateCompleteOrder } from '@/services/user';
import { IOrder, IOrderReward } from '@/types/order';
import { useEffect, useState } from 'react';

export default function usePlayGame({
  createCompletedEffect,
}: {
  createCompletedEffect: (x: number, y: number) => void;
}) {
  const [listOrder, setListOrder] = useState<IOrder[]>([]);
  const [rewards, setRewards] = useState<IOrderReward>({
    coins: 0,
    ranking: 0,
  });
  const [openOrderCompleted, setOpenOrderCompleted] = useState<boolean>(false);
  const [orderCompleted, setOrderCompleted] = useState<IOrder>();
  const [orderCompleteIndex, setOrderCompleteIndex] = useState<number>(0);
  const { profile } = useProfileStore();
  const { refetch } = useProfile();

  const getNewOrder = () => {
    try {
      const response = fetchNewOrderHelper(Number(profile?.volunteer_rank));
      if (!response) return;
      response.image_url = `./imgs/orders/dogs/dog${Math.floor(Math.random() * 12 + 1)}.png`;
      response.items = response.items.map((item) => ({ ...item, completed: 0 }));
      return response;
    } catch (error) {
      console.error('Error fetching new order:', error);
    }
  };

  useEffect(() => {
    getFirstListOrder();
  }, []);

  const getFirstListOrder = async () => {
    try {
      const newFirstOrder = getNewOrder();
      if (!newFirstOrder) return;
      const newSecondOrder = getNewOrder();
      if (!newSecondOrder) return;
      setListOrder([newFirstOrder, newSecondOrder]);
    } catch (error) {
      console.log(error);
    }
  };

  const isOrderCompleted = (order: IOrder) => {
    return order.items.every(
      (item) => item.completed * Number(profile?.item_per_object) >= item.total,
    );
  };

  const handleItemHit = (itemId: number, x: number, y: number) => {
    setListOrder((prevListOrder) => {
      let hasUpdated = false;
      const updatedListOrder = prevListOrder.map((order, index) => {
        if (hasUpdated) return order;

        const updatedItems = order.items.map((item) => {
          if (
            !hasUpdated &&
            item.object_id === itemId &&
            item.completed * Number(profile?.item_per_object) < item.total
          ) {
            hasUpdated = true;
            createCompletedEffect(x, y);
            return { ...item, completed: item.completed + 1 };
          }
          return item;
        });

        return { ...order, items: updatedItems };
      });

      const completedOrderIndex = updatedListOrder.findIndex(isOrderCompleted);

      if (completedOrderIndex !== -1) {
        const completedOrder = updatedListOrder[completedOrderIndex];
        const total_slided = completedOrder.items.reduce(
          (total, item) => total + item.completed,
          0,
        );

        updateCompleteOrder({
          object_tier: completedOrder.object_tier,
          total: completedOrder.total,
          total_slided,
        }).then((resp) => {
          refetch();
          setRewards({
            coins: resp.total_coin_plus,
            ranking: resp.total_rank_plus,
          });
          showToast();
          setOrderCompleted(completedOrder);
          setOrderCompleteIndex(completedOrderIndex);
          setOpenOrderCompleted(true);
        });
      }

      return updatedListOrder;
    });
  };

  const showToast = () => {
    const toast = document.getElementById('toast-custom');
    if (!toast) return;
    toast.classList.remove('hidden');
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
      toast.classList.add('hidden');
    }, 5000);
  };

  const keepPlaying = async () => {
    const newOrder = getNewOrder();

    if (!newOrder) return;

    setListOrder((prevListOrder) => {
      setOpenOrderCompleted(false);
      if (orderCompleteIndex === 0) {
        return [prevListOrder[1], newOrder];
      }
      return [prevListOrder[0], newOrder];
    });
  };

  return {
    listOrder,
    setListOrder,
    handleItemHit,
    openOrderCompleted,
    rewards,
    keepPlaying,
    getNewOrder,
    orderCompleted,
  };
}
