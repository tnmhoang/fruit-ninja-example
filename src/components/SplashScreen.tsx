import { useEffect, useState } from 'react';
import SectionScreen from './SectionScreen';
import useSoundEffect from '@/hooks/useSoundEffect';
import { SFX_KEYS } from '@/constants';
const SplashScreen = ({ minDisplayTime }: { minDisplayTime: number }) => {
  const [progress, setProgress] = useState(0);
  const { playSfx } = useSoundEffect();
  useEffect(() => {
    playSfx(SFX_KEYS.SPARKS_OUTRO);
    const MAX_PROGRESS = 99;
    const INCREASE_PER_STEP = 0.5;
    const timePerStep = minDisplayTime / (MAX_PROGRESS / INCREASE_PER_STEP);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + INCREASE_PER_STEP;

        return newProgress < MAX_PROGRESS ? newProgress : MAX_PROGRESS;
      });
    }, timePerStep);

    return () => clearInterval(interval);
  }, [minDisplayTime]);

  return (
    <SectionScreen
      className="flex h-full flex-1 flex-col items-center justify-center pb-0"
      isSplash={true}
    >
      <div className="flex justify-center">
        <img src="./imgs/name-app.png" alt="" className="w-52" />
      </div>
      <img src="./imgs/loading-animation.gif" alt="" className="mx-auto h-72 min-h-40 w-72" />
      <div className="flex w-full flex-col items-center space-y-3">
        <div className="relative h-3 w-[80%] max-w-[293px] rounded-full">
          <div className="progress-bar">
            <div className="h-full w-full rounded-[20px] border border-[#c5b297] bg-[#E0D6C7]">
              <div
                className="bar"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>
        </div>
        <p className="font-backToSchool text-[20px] text-[#473D2E]">Loading...</p>
      </div>
    </SectionScreen>
  );
};

export default SplashScreen;
