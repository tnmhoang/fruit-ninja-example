import { ArrowRightIcon, DogCoinIcon, SpinIcon, SuccessIcon } from '@/components/icons';
import useCheckGameConfigTask from '@/hooks/useCheckGameConfigTask';
import useGameConfig from '@/hooks/useGameConfig';
import useProfileStore from '@/hooks/useProfileStore';
import { formatCurrency } from '@/lib/utils';
import { CONFIG_LEADERBOARD_RANKING } from '@/types';
import { useState } from 'react';

const LeaguesTask = () => {
  const { profile } = useProfileStore();

  const { leagues } = useGameConfig();

  const { checkGameConfigTask } = useCheckGameConfigTask();

  const [loadingTasks, setLoadingTasks] = useState<number[]>([]);

  const handleCheckGameConfigTask = (id: number) => {
    setLoadingTasks((prev) => [...prev, id]);
    checkGameConfigTask.mutate(
      { taskId: id },
      {
        onSettled: () => {
          setLoadingTasks((prev) => prev.filter((prevId) => prevId !== id));
        },
      },
    );
  };

  return (
    <>
      {leagues?.map((leagueTask) => (
        <li
          key={leagueTask.id}
          className="flex items-center justify-between rounded-3xl bg-[#E8E0D5] p-3"
          onClick={() => {
            if (
              !profile?.config_checkin?.find(
                (config_checkin) => config_checkin.missions_id === leagueTask.id,
              )
            ) {
              handleCheckGameConfigTask(leagueTask.id);
            }
          }}
        >
          <div className="flex gap-3">
            <div className="flex max-h-11 min-h-11 min-w-11 max-w-11 items-center justify-center overflow-hidden">
              <img
                src={CONFIG_LEADERBOARD_RANKING[leagueTask.level].logo}
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-col gap-[3px]">
              <div className="text-sm font-semibold text-[#352E23]">{leagueTask.title}</div>
              <div className="flex items-center gap-3 text-xs">
                <div className="relative flex items-center pl-1">
                  <span className="absolute -left-1 z-30 max-h-[18px] max-w-[18px]">
                    <DogCoinIcon />
                  </span>
                  <div className="flex h-[17px] w-fit items-center justify-end rounded-full bg-[#FFFFFF] pl-3 pr-2 text-right text-xs font-semibold text-[#352E23]">
                    +{formatCurrency(leagueTask.reward, 2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {checkGameConfigTask.isPending && loadingTasks.includes(leagueTask.id) ? (
            <div className="flex h-8 w-8 items-center justify-center">
              <SpinIcon className="h-5 w-5" />
            </div>
          ) : !profile?.config_checkin?.find(
              (config_checkin) => config_checkin.missions_id === leagueTask.id,
            ) ? (
            <>
              <div className="flex h-8 w-8 items-center justify-center">
                <ArrowRightIcon className="w-5" />
              </div>
            </>
          ) : (
            <>
              <div>
                <SuccessIcon />
              </div>
            </>
          )}
        </li>
      ))}
    </>
  );
};

export default LeaguesTask;
