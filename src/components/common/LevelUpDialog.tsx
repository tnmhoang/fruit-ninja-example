import { CONFIG_LEADERBOARD_RANKING, User } from '@/types';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { useMemo } from 'react';
import { cn, formatCurrency, toTitleCase } from '@/lib/utils';
import Button3D from './Button3D';
import useGameConfig from '@/hooks/useGameConfig';
import { DogCoinIcon } from '../icons';

export default function LevelUpDialog({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: User;
}) {
  const { leagues } = useGameConfig();

  const leagueRewards = useMemo(() => {
    if (data.rank_index && leagues) {
      return leagues.find((league) => league.level === data.rank_index);
    }
  }, [data.rank_index, leagues]);

  const configRankCurrent = useMemo(() => {
    if (data.rank_level) {
      return CONFIG_LEADERBOARD_RANKING[data.rank_index];
    }
  }, [data.rank_level, CONFIG_LEADERBOARD_RANKING]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex h-full w-full max-w-full items-center justify-center border-none">
        <AlertDialogHeader className="flex h-full w-full flex-col items-center justify-center">
          <AlertDialogTitle className="relative z-10 flex w-full flex-col justify-center gap-[3px] font-backToSchool text-[32px] leading-none text-white">
            <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-[#2d2b28] opacity-80">
              <img
                style={{
                  mixBlendMode: 'screen',
                }}
                src="./imgs/level-up-light.png"
                alt="Pineapple"
                className="animation-scale w-full"
              />
            </div>
            <div className="relative flex flex-col items-center">
              <img src="./imgs/level-up.png" alt="level-up" className="w-full" />
              <img src={configRankCurrent?.logo} alt={data.rank_level} className="max-w-60" />
              <div className="text3d -mt-8 flex justify-center gap-1 text-[40px] capitalize">
                x{formatCurrency(leagueRewards?.reward, 2)}
                <DogCoinIcon className="w-10" />
              </div>
              <div className="max-w-80 pt-2 text-sm font-medium capitalize">
                {`Woof woof! You've just advanced to ${leagueRewards?.title}! Enjoy your [${formatCurrency(leagueRewards?.reward, 2)}] bark bucks and
                keep climbing the leaderboard!`}
              </div>
              <Button3D
                className={cn('mx-2 mt-5 h-[50px] w-full max-w-72')}
                classBtn={cn(
                  'flex flex-col justify-center items-center border-b border-white !rounded-2xl !z-10 !bg-[#A9B957]',
                )}
                classBtnBottom={cn('!rounded-2xl !bg-[#656F34] !z-0')}
                onClick={() => setOpen(false)}
              >
                <div className="text-border flex items-center font-backToSchool text-lg">
                  Claim reward now!
                </div>
              </Button3D>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="hidden"></AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
