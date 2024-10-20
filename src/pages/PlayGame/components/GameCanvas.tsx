import React, { useRef, useEffect, useState, useMemo } from 'react';
import { tier1Items, tier2Items, tier3Items, tier4Items } from '../constant';
import { IOrder } from '@/types/order';
import { shuffleArray } from '@/lib/utils';
interface Fruit {
  x: number;
  y: number;
  speed: number;
  img: HTMLImageElement;
}

interface GameCanvasProps {
  listOrder: IOrder[];
}
interface IPosition {
  x: number;
  y: number;
  pMouseX: number;
  pMouseY: number;
  life: number;
}
const GameCanvas = (props: GameCanvasProps) => {
  const { listOrder } = props;
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
        const image = new Image();
        image.src = item.img_url;
        const randomWidth = Math.random() * window.innerWidth;

        // img width: 70 - height: 50
        let object = {
          x: randomWidth,
          y: -(Math.random() * 87),
          speed: Math.random() * 1 + 1,
          img: image,
        };

        if (randomWidth === 0) {
          object.x = 20;
        } else if (randomWidth + 70 > window.innerWidth) {
          object.x = window.innerWidth - 70 - 20;
        } else {
          object.x = randomWidth;
        }
        listItemRef.current.push(object);
      });
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      listItemRef.current.forEach((item, index) => {
        item.y += item.speed;
        if (item.y > canvas.height) {
          item.y = -(Math.random() * 700);
        }
        // Draw the fruit
        context.save();
        context.drawImage(item.img, item.x, item.y, 70, 50);
        context.restore();
      });

      renderMouseLines(context);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    const myInterval = setInterval(startFalling, 2500);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(myInterval);
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

      // Độ dày thay đổi theo "life" để tạo hiệu ứng giống giọt nước biến mất
      const lineWidth = Math.max(1, line.life * 6); // Độ dày sẽ giảm dần khi life giảm

      context.strokeStyle = 'white'; // Màu của đường swipe
      context.lineWidth = lineWidth;
      context.beginPath();
      context.moveTo(line.pMouseX, line.pMouseY);
      context.lineTo(line.x, line.y);
      context.stroke();
      context.closePath();

      // Giảm giá trị life mỗi lần vẽ để làm mờ dần
      line.life -= 0.05;

      // Xóa đoạn đường swipe nếu life <= 0 (biến mất hoàn toàn)
      if (line.life <= 0) {
        linesArrayRef.current.splice(i, 1);
        i--; // Điều chỉnh chỉ số sau khi xóa phần tử
      }
    }
  };

  const handleMousemove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    removeItem(e.clientX, e.clientY);
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const prevMouseX = linesArrayRef.current.length
      ? linesArrayRef.current[linesArrayRef.current.length - 1].x
      : mouseX;
    const prevMouseY = linesArrayRef.current.length
      ? linesArrayRef.current[linesArrayRef.current.length - 1].y
      : mouseY;

    // Lưu thông tin đường swipe mới
    linesArrayRef.current.push({
      x: mouseX,
      y: mouseY,
      pMouseX: prevMouseX,
      pMouseY: prevMouseY,
      life: 1,
    });
    if (linesArrayRef.current.length > 4) {
      linesArrayRef.current.shift(); // Xóa các đường cũ để giới hạn độ dài
    }
  };

  const removeItem = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Lấy vị trí chuột tương đối so với canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    // Kiểm tra va chạm với các item và loại bỏ item va chạm
    listItemRef.current = listItemRef.current.filter((item) => {
      const isColliding =
        mouseX >= item.x &&
        mouseX <= item.x + 70 && // 70 là width của item
        mouseY >= item.y &&
        mouseY <= item.y + 50; // 50 là height của item
      if (isColliding) {
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        const audio = document.getElementById(`audioSound-${randomNumber}`);
        if (audio && (audio as HTMLAudioElement).paused) {
          (audio as HTMLAudioElement).currentTime = 0;
          (audio as HTMLAudioElement).volume = 1;
          (audio as HTMLAudioElement).play();
        }

        return false;
      }
      // Nếu va chạm, không giữ lại item
      return true;
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    removeItem(e.touches[0].clientX, e.touches[0].clientY);
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.touches[0].clientX - rect.left;
    const mouseY = e.touches[0].clientY - rect.top;
    const prevMouseX = linesArrayRef.current.length
      ? linesArrayRef.current[linesArrayRef.current.length - 1].x
      : mouseX;
    const prevMouseY = linesArrayRef.current.length
      ? linesArrayRef.current[linesArrayRef.current.length - 1].y
      : mouseY;

    // Lưu thông tin đường swipe mới
    linesArrayRef.current.push({
      x: mouseX,
      y: mouseY,
      pMouseX: prevMouseX,
      pMouseY: prevMouseY,
      life: 1,
    });
    if (linesArrayRef.current.length > 4) {
      linesArrayRef.current.shift(); // Xóa các đường cũ để giới hạn độ dài
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} onMouseMove={handleMousemove} onTouchMove={handleTouchMove} />
    </div>
  );
};

export default GameCanvas;
