import { IOrder } from '@/types/order';
import { useEffect, useMemo, useRef } from 'react';
import { IMAGE_SIZE, tier1Items, tier2Items, tier3Items, tier4Items } from '../constant';
import { shuffleArray } from '@/lib/utils';

declare const window: any;

interface ActionGameProps {
  listOrder: IOrder[];
  handleItemHit: (object_id: number, x: number, y: number) => void;
  isSfxOn: boolean;
}

interface Fruit {
  object_id: number;
  x: number;
  y: number;
  speed: number;
}

interface IPosition {
  x: number;
  y: number;
  pMouseX: number;
  pMouseY: number;
  life: number;
}

export default function useActionGame(props: ActionGameProps) {
  const { listOrder, handleItemHit, isSfxOn } = props;
  const totalObjectTier = listOrder.reduce((total, order) => order.object_tier + total, 0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const linesArrayRef = useRef<IPosition[]>([]);
  const listItemRef = useRef<Fruit[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 87 - 96;

    let animationFrameId: number;

    const startFalling = () => {
      combineItemsFromOrders.forEach((item) => {
        let object = {
          object_id: item.object_id,
          x: getXOfItem(),
          y: -(Math.random() * canvas.height),
          speed: Math.random() * 1 + 1,
        };

        listItemRef.current.push(object);
      });
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      listItemRef.current.forEach((item) => {
        item.y += item.speed;
        if (item.y > canvas.height) {
          item.y = -(Math.random() * canvas.height) - 87;
        }
        const image = new Image();
        image.src = combineItemsFromOrders.filter(
          (el) => el.object_id === item.object_id,
        )[0].img_url;
        // Draw the fruit
        context.save();
        context.drawImage(image, item.x, item.y, IMAGE_SIZE.WIDTH, IMAGE_SIZE.HEIGHT);
        context.restore();
      });

      renderMouseLines(context);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    startFalling();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [totalObjectTier, canvasRef]);

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

  const combineItemsFromOrders = useMemo(() => {
    const tiers = new Set(listOrder.map((order) => order.object_tier));
    let combinedItems: { object_id: number; img_url: string; speed: number }[] = [];
    tiers.forEach((tier) => {
      combinedItems = [...combinedItems, ...getItemsByTier(tier)];
    });
    return shuffleArray(combinedItems);
  }, [totalObjectTier]);

  const renderMouseLines = (context: CanvasRenderingContext2D) => {
    if (linesArrayRef.current.length === 0) return;

    for (let i = 0; i < linesArrayRef.current.length; i++) {
      const line = linesArrayRef.current[i];

      const lineWidth = Math.max(1, line.life * 6);

      context.strokeStyle = 'white';
      context.lineWidth = lineWidth;
      context.beginPath();
      context.moveTo(line.pMouseX, line.pMouseY);
      context.lineTo(line.x, line.y);
      context.stroke();
      context.closePath();

      line.life -= 0.05;

      if (line.life <= 0) {
        linesArrayRef.current.splice(i, 1);
        i--;
      }
    }
  };

  const handleMousemove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    slicingItem(mouseX, mouseY);
    effectLine(mouseX, mouseY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.touches[0].clientX - rect.left;
    const mouseY = e.touches[0].clientY - rect.top;
    slicingItem(mouseX, mouseY);
    effectLine(mouseX, mouseY);
  };

  const getXOfItem = () => {
    const randomWidth = Math.random() * window.innerWidth;
    if (randomWidth === 0) {
      return 20;
    } else if (randomWidth + IMAGE_SIZE.WIDTH > window.innerWidth) {
      return window.innerWidth - IMAGE_SIZE.WIDTH - 20;
    } else {
      return randomWidth;
    }
  };

  const slicingItem = (mouseX: number, mouseY: number) => {
    listItemRef.current = listItemRef.current.map((item) => {
      const isColliding =
        mouseX >= item.x &&
        mouseX <= item.x + IMAGE_SIZE.WIDTH &&
        mouseY >= item.y &&
        mouseY <= item.y + IMAGE_SIZE.WIDTH;
      if (isColliding) {
        if (isSfxOn) {
          playAudio();
        }
        handleItemHit(item.object_id, mouseX, mouseY);
        return {
          ...item,
          y: -Math.random() * 300 + 87,
          x: getXOfItem(),
        };
      }
      return item;
    });
  };

  const effectLine = (mouseX: number, mouseY: number) => {
    const prevMouseX = linesArrayRef.current.length
      ? linesArrayRef.current[linesArrayRef.current.length - 1].x
      : mouseX;
    const prevMouseY = linesArrayRef.current.length
      ? linesArrayRef.current[linesArrayRef.current.length - 1].y
      : mouseY;

    linesArrayRef.current.push({
      x: mouseX,
      y: mouseY,
      pMouseX: prevMouseX,
      pMouseY: prevMouseY,
      life: 1,
    });
    if (linesArrayRef.current.length > 4) {
      linesArrayRef.current.shift();
    }
  };

  const playAudio = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    const audio = document.getElementById(`audioSound-${randomNumber}`);
    if (audio && (audio as HTMLAudioElement).paused) {
      (audio as HTMLAudioElement).currentTime = 0;
      (audio as HTMLAudioElement).volume = 1;
      (audio as HTMLAudioElement).play();
    }
  };

  return { handleTouchMove, canvasRef, handleMousemove };
}
