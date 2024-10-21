import { ArrowRightIcon, DogCoinIcon, SpinIcon, SuccessIcon } from '@/components/icons';
import useCheckGameConfigTask from '@/hooks/useCheckGameConfigTask';
import useGameConfig from '@/hooks/useGameConfig';
import useProfileStore from '@/hooks/useProfileStore';
import { formatCurrency } from '@/lib/utils';
import { GameConfig } from '@/types';
import { initUtils } from '@telegram-apps/sdk';
import { useMemo, useState } from 'react';

const MissionTask = () => {
  const { profile } = useProfileStore();

  const { dailyMission } = useGameConfig();

  const { checkGameConfigTask } = useCheckGameConfigTask();

  const [loadingTasks, setLoadingTasks] = useState<number[]>([]);

  const utils = initUtils();

  const handleContentClick = (task?: GameConfig) => {
    if (task?.task_url) {
      utils.openLink(task.task_url);
      setLoadingTasks((prev) => [...prev, task.id]);
      setTimeout(
        () => {
          checkGameConfigTask.mutate(
            { taskId: task.id },
            {
              onSuccess: () => {
                setLoadingTasks((prev) => prev.filter((id) => id !== task.id));
              },

              onSettled: () => {
                setLoadingTasks((prev) => prev.filter((prevId) => prevId !== task.id));
              },
            },
          );
        },
        (Math.floor(Math.random() * (7 - 3 + 1)) + 3) * 1000,
      );
    }
  };

  const lastCheckinConfig = useMemo(() => {
    const lastCheckinDailyMission = profile?.config_checkin?.filter(
      (config_checkin) => config_checkin.type === 'daily_mission',
    );

    return lastCheckinDailyMission;
  }, [profile?.config_checkin]);

  const timeToday = new Date();
  timeToday.setHours(0, 0, 0, 0);

  return (
    <>
      {dailyMission?.map((dailyMissionTask) => {
        const lastCheckinMission = lastCheckinConfig?.find(
          (dailyMission) => dailyMission.missions_id === dailyMissionTask.id,
        );

        return (
          <li
            key={dailyMissionTask.id}
            className="flex items-center justify-between rounded-3xl bg-[#E8E0D5] p-3"
            onClick={() => {
              if (
                !(
                  lastCheckinMission &&
                  new Date(lastCheckinMission.last_checkin).getTime() >= timeToday.getTime()
                )
              ) {
                if (checkGameConfigTask.isPending || loadingTasks.includes(dailyMissionTask.id)) {
                  return;
                }
                handleContentClick(dailyMissionTask);
              }
            }}
          >
            <div className="flex gap-3">
              <div className="flex max-h-11 min-h-11 min-w-11 max-w-11 items-center justify-center overflow-hidden rounded-full">
                <img src={'./imgs/website.png'} className="h-full w-full" />
              </div>
              <div className="flex flex-col gap-[3px]">
                <div className="text-sm font-semibold text-[#352E23]">{dailyMissionTask.title}</div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="relative flex items-center pl-1">
                    <span className="absolute -left-1 z-30 max-h-[18px] max-w-[18px]">
                      <DogCoinIcon />
                    </span>
                    <div className="flex h-[17px] w-fit items-center justify-end rounded-full bg-[#FFFFFF] pl-3 pr-2 text-right text-xs font-semibold text-[#352E23]">
                      +{formatCurrency(dailyMissionTask.reward, 2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {loadingTasks.includes(dailyMissionTask.id) ? (
              <div className="flex h-8 w-8 items-center justify-center">
                <SpinIcon className="h-5 w-5" />
              </div>
            ) : lastCheckinMission &&
              new Date(lastCheckinMission.last_checkin).getTime() >= timeToday.getTime() ? (
              <>
                <div>
                  <SuccessIcon />
                </div>
              </>
            ) : (
              <>
                <div className="flex h-8 w-8 items-center justify-center">
                  <ArrowRightIcon className="w-5" />
                </div>
              </>
            )}
          </li>
        );
      })}
    </>
  );
};

export default MissionTask;
