// import Footer from '@/components/Layout/Footer';
// import Header from '@/components/Layout/Header';
import SplashScreen from '@/components/SplashScreen';
import { ScrollArea } from '@/components/ui/scroll-area';
import useProfile from '@/hooks/useProfile';
import useProfileStore from '@/hooks/useProfileStore';
import { memo, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ButtonHandler from '../common/BackButtonHandler';
const Layout = () => {
  const profile = useProfileStore((state) => state.profile);
  const { isLoading } = useProfile();

  const [visible, setVisible] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 3000);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!profile && profile !== undefined)
    return <div className="min-h-screen bg-white">Required telegram data</div>;

  return (
    <ButtonHandler>
      <ScrollArea className="flex h-screen flex-col bg-[#101114] font-inter text-white">
        {/* <Header /> */}
        <div className="absolute opacity-0">
          <audio
            id="audioSound-1"
            controls
            src="./sfx/game_sounds/Slicing/Slicing 1.wav"
            preload="auto"
          />
          <audio
            id="audioSound-2"
            controls
            src="./sfx/game_sounds/Slicing/Slicing 2.wav"
            preload="auto"
          />
          <audio
            id="audioSound-3"
            controls
            src="./sfx/game_sounds/Slicing/Slicing 3.wav"
            preload="auto"
          />
          <audio
            id="audioSound-orderCompleted"
            controls
            src="./sfx/game_sounds/Receiving Dog Coins or Ranking Points.wav"
            preload="auto"
          />
        </div>

        {isLoading || !visible ? (
          <SplashScreen minDisplayTime={2500} />
        ) : (
          <main className="relative flex h-screen w-screen flex-col">
            {!profile ? <>Something went wrong</> : <Outlet />}
          </main>
        )}

        {/* <Footer /> */}
      </ScrollArea>
    </ButtonHandler>
  );
};

export default memo(Layout);
