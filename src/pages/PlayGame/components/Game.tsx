import NavMenu from '@/components/layout/NavMenu';
import { IOrder } from '@/types/order';
import { generateRandomNumber } from '../constant';
import useActionGame from '../hooks/useActionGame';

const Game = ({
  listOrder,
  handleItemHit,
  createTrailingEffect,
  isSfxOn,
}: {
  listOrder: IOrder[];
  handleItemHit: (el: number, x: number, y: number) => void;
  createTrailingEffect: (x: number, y: number) => void;
  isSfxOn: boolean;
}) => {
  const { combineItemsFromOrders, handleTouchMove, fruitListRef } = useActionGame({
    handleItemHit,
    listOrder,
    createTrailingEffect,
    isSfxOn,
  });
  return (
    <>
      <div id="fruitContainer" onTouchMove={handleTouchMove} onMouseMove={handleTouchMove}>
        <div className="relative h-full w-full" ref={fruitListRef}>
          {combineItemsFromOrders.map((fruit, index) => {
            const left = Math.random() * window.innerWidth;
            const top = -(Math.random() * 87);
            return (
              <div
                id={`fruit-${index}`}
                key={generateRandomNumber(index)}
                style={{
                  position: 'absolute',
                  top: `${top}px`,
                  left: `${left}px`,
                  objectFit: 'contain',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={fruit.img_url}
                  alt="Fruit"
                  style={{ objectFit: 'contain' }}
                  className="pointer-events-none max-w-[70px]"
                />
              </div>
            );
          })}
        </div>
      </div>
      <NavMenu />
    </>
  );
};

export default Game;
