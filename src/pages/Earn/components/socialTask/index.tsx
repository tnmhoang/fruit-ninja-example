import { ArrowRightIcon, DogCoinIcon, SpinIcon, SuccessIcon } from '@/components/icons';
import useUserTaskSocial from '@/hooks/useUserTaskSocial';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import SocialTaskDialog from './SocialTaskDialog';
import { ISocialTask } from '@/types/task';

const SocialTask = () => {
  const { data: tasks } = useUserTaskSocial();
  const [loadingTasks, setLoadingTasks] = useState<number[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [socialTask, setSocialTask] = useState<ISocialTask>();

  return (
    <>
      {(tasks ?? [])
        .filter((task) => task.type !== 'YOUTUBE')
        .map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-3xl bg-[#E8E0D5] p-3"
            onClick={() => {
              if (!item.task_user?.is_done) {
                window.open(item.task_url, '_blank');
                setSocialTask(item);
                setOpen(true);
              }
            }}
          >
            <div className="flex gap-3">
              <div className="flex max-h-11 min-h-11 min-w-11 max-w-11 items-center justify-center overflow-hidden rounded-full">
                <img
                  src={
                    item.logo
                      ? item.logo
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRku8_NMJHPR56xur3VJWN1MA1FbFE9p3wj_g&s'
                  }
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

      {socialTask && (
        <SocialTaskDialog
          open={open}
          setOpen={setOpen}
          socialTask={socialTask}
          setLoadingTasks={setLoadingTasks}
          loadingTasks={loadingTasks}
        />
      )}
    </>
  );
};

export default SocialTask;
