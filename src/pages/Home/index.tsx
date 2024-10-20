import {
  AboutHomeIcon,
  BtnWalletIcon,
  DogCoinIcon,
  RankIcon,
  SettingIcon,
} from '@/components/icons';
import NavMenu from '@/components/layout/NavMenu';

import SectionScreen from '@/components/SectionScreen';
import { Button } from '@/components/ui/button';
import { APP_URLS, SFX_KEYS } from '@/constants';
import useProfileStore from '@/hooks/useProfileStore';
import useSoundEffect from '@/hooks/useSoundEffect';
import { cn, formatCurrency, getName, toTitleCase } from '@/lib/utils';
import { CONFIG_LEADERBOARD_RANKING, Rank_level } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SettingDialog from './components/SettingDialog';
import ClaimMining from './components/ClaimMining';
import SheetMyProfile from '@/components/common/SheetMyProfile';
import AboutDialog from '@/components/common/AboutDialog';
const HomePage = () => {
  const profile = useProfileStore((state) => state.profile);
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [openAbout, setOpenAbout] = useState<boolean>(false);

  const { playSfx } = useSoundEffect();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const configRankCurrent = useMemo(() => {
    if (profile?.rank_level) {
      return CONFIG_LEADERBOARD_RANKING[profile.rank_index];
    }
  }, [profile?.rank_level, CONFIG_LEADERBOARD_RANKING]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <SectionScreen className="flex flex-1 flex-col">
      <div className="flex h-full flex-col p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <SheetMyProfile />
            <div className={cn('flex flex-col gap-[6px] pl-2')}>
              <div className="font-semibold text-[#352E23]">{getName(profile)}</div>
              <div className="relative pl-1">
                <span className="absolute -left-2 -top-1">
                  <img src={configRankCurrent?.logo} alt="" className="h-9 w-9" />
                </span>
                <div
                  className={cn(
                    'flex h-5 w-fit items-center justify-end rounded-full bg-[#FFFFFF] pl-6 pr-2 text-right font-backToSchool text-xs capitalize text-[#352E23]',
                    configRankCurrent?.styleInHomePage,
                  )}
                >
                  {profile?.rank_level && toTitleCase(profile.rank_level)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                playSfx(SFX_KEYS.WALLET);
                navigate(APP_URLS.WALLET);
              }}
              className="flex rounded-full"
            >
              <BtnWalletIcon className="w-9" />
            </button>
            <button
              className="rounded-full"
              onClick={() => {
                playSfx(SFX_KEYS.SETTING);
                setOpenSetting(true);
              }}
            >
              <SettingIcon className="w-9" />
            </button>
            <button
              className="rounded-full"
              onClick={() => {
                setOpenAbout(true);
              }}
            >
              <AboutHomeIcon className="w-9" />
            </button>

            <SettingDialog open={openSetting} setOpen={setOpenSetting} />
            <AboutDialog
              title="How it works?"
              content={
                <div className="pt-3 font-medium text-[#352E23]">
                  Slice falling treats, complete doggy orders, and earn coins! Use your coins to
                  upgrade, invite friends, rise up the ranks, and become the top doggo! Ready to
                  slice and fetch your way to the top
                </div>
              }
              open={openAbout}
              setOpen={setOpenAbout}
            />
          </div>
        </div>
        <div className="relative flex flex-1 flex-col pt-2">
          <button
            className="absolute right-0 top-14 z-20"
            onClick={() => {
              playSfx(SFX_KEYS.RANKING);
              navigate(APP_URLS.LEADERBOARD_PAGE);
            }}
          >
            <img src="./imgs/rank.png" className="h-14 w-12" />
          </button>
          <div className="flex items-center justify-center gap-2">
            <span className="min-h-[52px] min-w-[52px]">
              <DogCoinIcon />
            </span>
            <span className="text3d font-backToSchool text-[52px] tracking-widest">
              {formatCurrency(profile?.current_coin, 2)}
            </span>
          </div>
          <div className="flex max-h-[500px] flex-1 justify-center">
            <div className="relative flex h-full w-full items-center justify-center">
              <img
                src="./imgs/dog-home.png"
                alt=""
                className="absolute inset-0 m-auto h-full max-h-[100vw] object-cover"
              />
              <img
                src="./imgs/dog-home-2.png"
                alt=""
                className="absolute inset-0 m-auto h-full max-h-[100vw] object-cover mix-blend-lighten"
              />
            </div>
          </div>
          <div className="relative mt-4 flex h-[95px] items-center">
            <img src="./imgs/drop-game-frame.png" alt="" className="absolute h-full w-full" />
            <div className="relative z-10 flex w-full justify-between px-[8%]">
              <div className="font-backToSchool text-[26px] font-semibold text-[#473D2E]">
                DOGL Dash
              </div>
              <Button
                onClick={() => {
                  playSfx(SFX_KEYS.PLAY);
                  navigate(APP_URLS.PLAY_GAME);
                }}
                className="w-24 rounded-xl border border-black/20 bg-[#A9B957] font-semibold shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[rgba(169,185,87,0.9)]"
              >
                Play
              </Button>
            </div>
          </div>
          <div className="pt-4">
            <ClaimMining />
          </div>
        </div>
      </div>

      <NavMenu />
    </SectionScreen>
  );
};

export default HomePage;
