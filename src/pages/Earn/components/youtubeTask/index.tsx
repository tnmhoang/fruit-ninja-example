import { ArrowRightIcon, DogCoinIcon, SpinIcon, SuccessIcon } from '@/components/icons';
import useUserTaskSocial from '@/hooks/useUserTaskSocial';
import { formatCurrency } from '@/lib/utils';

import { useState } from 'react';
import YoutubeTaskDialog from './YoutubeTaskDialog';
import { ISocialTask } from '@/types/task';
import { initUtils } from '@telegram-apps/sdk';
import useCheckSocialTask from '@/hooks/useCheckSocialTask';

const YoutubeTask = () => {
  const { data: tasks, refetch } = useUserTaskSocial();

  const [loadingTasks, setLoadingTasks] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [youtubeTask, setYoutubeTask] = useState<ISocialTask>();

  const { checkSocialTask } = useCheckSocialTask();

  const utils = initUtils();

  const handleContentClick = (task?: ISocialTask) => {
    if (task?.task_url) {
      utils.openLink(task.task_url);
      setLoadingTasks((prev) => [...prev, task.id]);
      setTimeout(
        () => {
          checkSocialTask.mutate(
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

  return (
    <>
      {tasks &&
        tasks
          ?.filter((task) => task.type === 'YOUTUBE')
          .map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-3xl bg-[#E8E0D5] p-3"
              onClick={() => {
                if (!item.task_user?.is_done) {
                  if (item.keyword === null) {
                    handleContentClick(item);
                    return;
                  }
                  setYoutubeTask(item);
                  setOpen(true);
                }
              }}
            >
              <div className="flex gap-3">
                <div className="flex max-h-11 min-h-11 min-w-11 max-w-11 items-center justify-center overflow-hidden">
                  <img
                    src={item.logo ? item.logo : './imgs/youtube.png'}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col gap-[3px]">
                  <div className="text-sm font-semibold text-[#352E23]">{item.title}</div>
                  <div className="flex items-center gap-3 text-xs">
                    {loadingTasks.includes(item.id) ? (
                      <>
                        <div>
                          <SpinIcon className="mx-auto h-5 w-5" />
                        </div>
                      </>
                    ) : (
                      <>
                        {item.task_user?.is_done && <div className="text-[#79716B]">Completed</div>}
                      </>
                    )}

                    <div className="relative flex items-center pl-1">
                      <span className="absolute -left-1 z-30 max-h-[18px] max-w-[18px]">
                        <DogCoinIcon />
                      </span>
                      <div className="flex h-[17px] w-fit items-center justify-end rounded-full bg-[#FFFFFF] pl-3 pr-2 text-right text-xs font-semibold text-[#352E23]">
                        +{formatCurrency(item.reward_number, 2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {loadingTasks.includes(item.id) ? (
                <div className="flex h-8 w-8 items-center justify-center">
                  <SpinIcon className="h-5 w-5" />
                </div>
              ) : !item.task_user?.is_done ? (
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

      {youtubeTask && (
        <YoutubeTaskDialog
          open={open}
          setOpen={setOpen}
          taskYoutube={youtubeTask}
          setLoadingTasks={setLoadingTasks}
          loadingTasks={loadingTasks}
        />
      )}
    </>
  );
};

export default YoutubeTask;
