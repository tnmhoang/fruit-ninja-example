import { IOrder } from '@/types/order';
import useActionGame from '../hooks/useActionGame';
const Game = ({
  listOrder,
  handleItemHit,

  isSfxOn,
}: {
  listOrder: IOrder[];
  handleItemHit: (el: number, x: number, y: number) => void;
  isSfxOn: boolean;
}) => {
  const { handleTouchMove, canvasRef, handleMousemove } = useActionGame({
    handleItemHit,
    listOrder,
    isSfxOn,
  });
  return (
    <div>
      <canvas ref={canvasRef} onMouseMove={handleMousemove} onTouchMove={handleTouchMove} />
    </div>
  );
};

export default Game;
