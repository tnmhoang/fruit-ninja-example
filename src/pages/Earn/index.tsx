import { ArrowRightIcon, DogCoinIcon, SuccessIcon } from '@/components/icons';
import NavMenu from '@/components/layout/NavMenu';

import SectionScreen from '@/components/SectionScreen';
import { ScrollArea } from '@/components/ui/scroll-area';
import useCheckInDaily from '@/hooks/useCheckInDaily';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import DailyReward from './components/dailyReward';
import MissionTask from './components/missionTask';
import YoutubeTask from './components/youtubeTask';
import SocialTask from './components/socialTask';
import FriendsTask from './components/friendsTask';
import LeaguesTask from './components/leaguesTask';
import WalletTask from './components/walletTask';

const EarnPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { dailyRewards, currentCheckInNo, isTodayCheckedin } = useCheckInDaily();

  return (
    <SectionScreen className="flex flex-1 flex-col">
      <div className="relative flex-1 px-6">
        <div
          style={{
            backgroundImage: `url('./imgs/bg-image-earn.png')`,
          }}
          className="absolute left-0 top-0 z-0 h-[301px] w-full bg-cover bg-center bg-no-repeat"
        ></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="text3d w-full pt-5 font-backToSchool text-[40px] uppercase">EARN</div>
          <div className="w-full pt-16">
            <div className="relative w-full rounded-3xl border-2 border-[#6A5B46] bg-[#C1AD90] p-2">
              <div className="absolute -top-5 left-1/2 flex h-11 w-full max-w-[188px] -translate-x-1/2 transform items-center">
                <img src="./imgs/task-frame.png" alt="" className="absolute h-full w-full" />
                <div className="relative z-10 flex w-full items-center justify-center">
                  <div className="text3d-sm font-backToSchool text-[20px]">Daily Quest</div>
                </div>
              </div>
              <ScrollArea className="h-full rounded-xl pt-6">
                <ul className="max-h-[216px] space-y-[6px]">
                  <div
                    className="flex items-center justify-between rounded-3xl bg-[#E8E0D5] p-3"
                    onClick={() => setOpen(true)}
                  >
                    <div className="flex gap-3">
                      <div className="flex max-h-11 min-h-11 min-w-11 max-w-11 items-center justify-center overflow-hidden rounded-full">
                        <img src={'./imgs/icons/daily-check-in.png'} className="h-full w-full" />
                      </div>
                      <div className="flex flex-col gap-[3px]">
                        <div className="text-sm font-semibold text-[#352E23]">Daily check-in</div>
                        <div className="flex items-center gap-3 text-xs">
                          <div className="relative flex items-center pl-1">
                            <span className="absolute -left-1 z-30 max-h-[18px] max-w-[18px]">
                              <DogCoinIcon />
                            </span>
                            <div className="flex h-[17px] w-fit items-center justify-end rounded-full bg-[#FFFFFF] pl-3 pr-2 text-right text-xs font-semibold text-[#352E23]">
                              +
                              {dailyRewards &&
                                formatCurrency(dailyRewards[currentCheckInNo - 1].reward, 2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="max-w-min-w-9 min-w-9">
                      {isTodayCheckedin ? <SuccessIcon /> : <ArrowRightIcon className="w-5" />}
                    </div>
                  </div>

                  <MissionTask />
                </ul>
              </ScrollArea>
              <DailyReward open={open} setOpen={setOpen} />
            </div>
          </div>

          <div className="w-full pt-10">
            <div className="relative w-full rounded-3xl border-2 border-[#6A5B46] bg-[#C1AD90] pb-4">
              <div className="absolute -top-5 left-1/2 z-10 flex h-11 w-full max-w-[270px] -translate-x-1/2 transform items-center">
                <img src="./imgs/task-frame.png" alt="" className="absolute h-full w-full" />
                <div className="relative z-10 flex w-full items-center justify-center">
                  <div className="text3d-sm font-backToSchool text-[20px]">Watch Our Shows</div>
                </div>
              </div>
              <ScrollArea className="h-full rounded-xl pt-8">
                <ul className="max-h-[216px] space-y-[6px] px-2">
                  <YoutubeTask />
                </ul>
              </ScrollArea>
            </div>
          </div>

          <div className="w-full pt-10">
            <div className="relative w-full rounded-3xl border-2 border-[#6A5B46] bg-[#C1AD90] pb-4">
              <div className="absolute -top-5 left-1/2 z-10 flex h-11 w-full max-w-52 -translate-x-1/2 transform items-center">
                <img src="./imgs/task-frame.png" alt="" className="absolute h-full w-full" />
                <div className="relative z-10 flex w-full items-center justify-center">
                  <div className="text3d-sm font-backToSchool text-[20px]">Social Task</div>
                </div>
              </div>
              <ScrollArea className="h-full rounded-xl pt-8">
                <ul className="max-h-[216px] space-y-[6px] px-2">
                  <SocialTask />
                </ul>
              </ScrollArea>
            </div>
          </div>

          <div className="w-full pt-10">
            <div className="relative w-full rounded-3xl border-2 border-[#6A5B46] bg-[#C1AD90] pb-4">
              <div className="absolute -top-5 left-1/2 z-10 flex h-11 w-full max-w-40 -translate-x-1/2 transform items-center">
                <img src="./imgs/task-frame.png" alt="" className="absolute h-full w-full" />
                <div className="relative z-10 flex w-full items-center justify-center">
                  <div className="text3d-sm font-backToSchool text-[20px]">Friends</div>
                </div>
              </div>
              <ScrollArea className="h-full rounded-xl pt-8">
                <ul className="max-h-[216px] space-y-[6px] px-2">
                  <FriendsTask />
                </ul>
              </ScrollArea>
            </div>
          </div>

          <div className="w-full pt-10">
            <div className="relative w-full rounded-3xl border-2 border-[#6A5B46] bg-[#C1AD90] pb-4">
              <div className="absolute -top-5 left-1/2 z-10 flex h-11 w-full max-w-40 -translate-x-1/2 transform items-center">
                <img src="./imgs/task-frame.png" alt="" className="absolute h-full w-full" />
                <div className="relative z-10 flex w-full items-center justify-center">
                  <div className="text3d-sm font-backToSchool text-[20px]">Leagues</div>
                </div>
              </div>
              <ScrollArea className="h-full rounded-xl pt-8">
                <ul className="max-h-[216px] space-y-[6px] px-2">
                  <LeaguesTask />
                </ul>
              </ScrollArea>
            </div>
          </div>

          <div className="w-full pt-10">
            <div className="relative w-full rounded-3xl border-2 border-[#6A5B46] bg-[#C1AD90] pb-4">
              <div className="absolute -top-5 left-1/2 z-10 flex h-11 w-full max-w-40 -translate-x-1/2 transform items-center">
                <img src="./imgs/task-frame.png" alt="" className="absolute h-full w-full" />
                <div className="relative z-10 flex w-full items-center justify-center">
                  <div className="text3d-sm font-backToSchool text-[20px]">Wallet</div>
                </div>
              </div>
              <ScrollArea className="h-full rounded-xl pt-8">
                <ul className="max-h-[216px] space-y-[6px] px-2">
                  <WalletTask />
                </ul>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
      <NavMenu replace />
    </SectionScreen>
  );
};

export default EarnPage;
