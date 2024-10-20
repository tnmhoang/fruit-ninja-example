import NavMenu from '@/components/layout/NavMenu';
import useProfileStore from '@/hooks/useProfileStore';
import useSoundEffectStore from '@/hooks/useSoundEffectStore';
import { useMemo } from 'react';
import Game from './components/Game';
import HeaderGame from './components/HeaderGame';
import OrderGame from './components/OrderGame';
import OrderToast from './components/OrderToast';
import useEffectGame from './hooks/useEffectGame';
import usePlayGame from './hooks/usePlayGame';
import GameCanvas from './components/GameCanvas';

const PlayGame = () => {
  const { profile } = useProfileStore();
  const { createCompletedEffect, createTrailingEffect } = useEffectGame();
  const { isSfxOn } = useSoundEffectStore();
  const { listOrder, handleItemHit, openOrderCompleted, rewards, keepPlaying, orderCompleted } =
    usePlayGame({
      createCompletedEffect,
    });

  const game = useMemo(
    () => (
      <Game
        listOrder={listOrder}
        handleItemHit={handleItemHit}
        createTrailingEffect={createTrailingEffect}
        isSfxOn={isSfxOn}
      />
    ),
    [listOrder.reduce((total, order) => order.object_tier + total, 0), isSfxOn],
  );

  const gameCanvas = useMemo(
    () => <GameCanvas listOrder={listOrder} />,
    [listOrder.reduce((total, order) => order.object_tier + total, 0)],
  );
  return (
    <>
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ backgroundImage: `url('./imgs/bg-game.png')` }}
      >
        <HeaderGame />
        <div
          className="relative h-[21px]"
          style={{ backgroundImage: `url('./imgs/order-crossbar.png')` }}
        >
          <OrderGame listOrder={listOrder} itemPerObject={Number(profile?.item_per_object)} />
        </div>

        <OrderToast
          open={openOrderCompleted}
          keepPlaying={keepPlaying}
          rewards={rewards}
          orderCompleted={orderCompleted}
        />

        <div className="h-full w-full">{gameCanvas}</div>
        <NavMenu />
      </div>
    </>
  );
};

export default PlayGame;
