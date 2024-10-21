import useProfileStore from '@/hooks/useProfileStore';
import { useEffect } from 'react';

declare const window: any;

export default function useEffectGame() {
  const { profile } = useProfileStore();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      e.preventDefault();
    };
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  useEffect(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }

    window.Telegram.WebApp.BackButton.show();
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      console.log('Back button clicked, but action is prevented');
    });

    const element: any = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }

    return () => {
      window.Telegram.WebApp.BackButton.hide();
    };
  }, []);

  // effect after swipe item right
  const createCompletedEffect = (x: number, y: number) => {
    const trail = document.createElement('span');
    trail.className = 'score-animation';
    trail.innerText = `+${Number(profile?.item_per_object)}`;
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;

    document.body.appendChild(trail);

    // Remove trail after animation ends (e.g., 0.5s)
    setTimeout(() => {
      trail.remove();
    }, 500); // Match duration of the CSS animation
  };

  return { createCompletedEffect };
}
