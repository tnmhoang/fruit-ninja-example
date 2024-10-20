import useAppTimeStore from '@/hooks/useAppTimeStore';
import useGameConfig from '@/hooks/useGameConfig';
import useGameStore from '@/hooks/useGameStore';
import useSoundEffect from '@/hooks/useSoundEffect';
import useSoundEffectStore from '@/hooks/useSoundEffectStore';
import { PropsWithChildren, useEffect } from 'react';
const GameProvider = ({ children }: PropsWithChildren) => {
const {isBgmOn} = useSoundEffectStore();
  const { playBgm, stopBgm, pauseAudio, resumeAudio } = useSoundEffect();
  const [miningPerHour, increaseUnClaimedMining] = useGameStore((state) => [
    state.miningPerHour,
    state.increaseUnClaimedMining,
  ]);
  useGameConfig();
  useAppTimeStore.getState().startTicking();

  useEffect(() => {
    const interval = setInterval(() => {
      increaseUnClaimedMining(miningPerHour / (60 * 10));
    }, 100);

    return () => clearInterval(interval);
  }, [increaseUnClaimedMining, miningPerHour]);

  useEffect(() => {
    if (isBgmOn) {
      playBgm();
    } else {
      stopBgm();
    }
  }, [isBgmOn, playBgm, stopBgm]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAudio();
      } else {
        resumeAudio();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pauseAudio, resumeAudio]);

  return <>{children}</>;
};

export default GameProvider;
