import { IOrder } from '@/types/order';
import { useEffect, useMemo, useRef } from 'react';
import { tier1Items, tier2Items, tier3Items, tier4Items } from '../constant';
import { shuffleArray } from '@/lib/utils';

declare const window: any;

interface ActionGameProps {
  listOrder: IOrder[];
  handleItemHit: (object_id: number, x: number, y: number) => void;
  createTrailingEffect: (x: number, y: number) => void;
  isSfxOn: boolean;
}

export default function useActionGame(props: ActionGameProps) {
  const { listOrder, handleItemHit, createTrailingEffect, isSfxOn } = props;
  const totalObjectTier = listOrder.reduce((total, order) => order.object_tier + total, 0);
  const fruitListRef = useRef<any>();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (fruitListRef.current) {
      const myInterval = setInterval(startFalling, 10);

      return () => {
        stopFalling();
        clearInterval(myInterval);
      };
    }
  }, [fruitListRef.current, totalObjectTier]);

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    const x =
      e.type === 'touchmove'
        ? (e as React.TouchEvent).touches[0].clientX
        : (e as React.MouseEvent).clientX;
    const y =
      e.type === 'touchmove'
        ? (e as React.TouchEvent).touches[0].clientY
        : (e as React.MouseEvent).clientY;

    createTrailingEffect(x, y);
    combineItemsFromOrders.forEach((el, index) => {
      const fruitElement = document.getElementById(`fruit-${index}`);
      if (!fruitElement) return;
      const top = Number(fruitElement?.style.top.replace('px', ''));
      const left = Number(fruitElement?.style.left.replace('px', ''));
      const height = fruitElement.clientHeight;
      const width = fruitElement.clientWidth;

      if (x >= left && x <= left + width && y - 87 >= top && y - 87 <= top + height) {
        const randomWidth = Math.random() * window.innerWidth;

        fruitElement.style.top = `${-(Math.random() * 87)}px`;
        if (randomWidth === 0) {
          fruitElement.style.left = `20px`;
        } else if (randomWidth + fruitElement.clientWidth > window.innerWidth) {
          fruitElement.style.left = `${window.innerWidth - fruitElement.clientWidth - 20}px`;
        } else {
          fruitElement.style.left = `${randomWidth}px`;
        }
        handleItemHit(el.object_id, x, y);
        playAudio();
      }
    });
  };

  const getItemsByTier = (tier: number) => {
    switch (tier) {
      case 1:
        return tier1Items;
      case 2:
        return tier2Items;
      case 3:
        return tier3Items;
      case 4:
        return tier4Items;
      default:
        return [];
    }
  };

  const playAudio = () => {
    if (isSfxOn) {
      const randomNumber = Math.floor(Math.random() * 3) + 1;
      const audio = document.getElementById(`audioSound-${randomNumber}`);

      if ((audio as HTMLAudioElement).paused) {
        (audio as HTMLAudioElement).currentTime = 0;
        (audio as HTMLAudioElement).volume = 1;
        (audio as HTMLAudioElement).play();
      }
    }
  };

  const combineItemsFromOrders = useMemo(() => {
    // random index combinedItems 0 or 1
    // const randomIndexTier = Math.floor(Math.random() * 2);

    const tiers = listOrder.map((order) => order.object_tier);
    let combinedItems: { object_id: number; img_url: string; speed: number }[] = [];
    console.log('tiers', tiers);
    tiers.forEach((tier) => {
      combinedItems = [...combinedItems, ...getItemsByTier(tier)];
    });

    // amount object tier 18
    // combinedItems = [...combinedItems, ...getItemsByTier(tiers[randomIndexTier])];
    return shuffleArray(combinedItems);
  }, [totalObjectTier]);

  const startFalling = () => {
    combineItemsFromOrders.forEach((item, index) => {
      const fruitElement = document.getElementById(`fruit-${index}`);

      if (!fruitElement) return;
      const top = Number(fruitElement?.style.top.replace('px', ''));

      fruitElement.style.top = `${top + item.speed}px`;

      if (top > fruitListRef.current.clientHeight) {
        let randomWidth = Math.random() * window.innerWidth;

        fruitElement.style.top = `${-(Math.random() * 87)}px`;

        if (randomWidth === 0) {
          fruitElement.style.left = `20px`;
        } else if (randomWidth + fruitElement.clientWidth > window.innerWidth) {
          fruitElement.style.left = `${window.innerWidth - fruitElement.clientWidth - 20}px`;
        } else {
          fruitElement.style.left = `${randomWidth}px`;
        }
      }
    });
  };

  const stopFalling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear interval
      intervalRef.current = null;
    }
  };

  return { combineItemsFromOrders, handleTouchMove, fruitListRef };
}
