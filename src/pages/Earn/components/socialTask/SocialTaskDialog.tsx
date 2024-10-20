import { cn, formatCurrency } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CloseIcon, DogCoinIcon, ErrorIcon, SuccessIcon } from '@/components/icons';
import { ISocialTask } from '@/types/task';
import useCheckSocialTask from '@/hooks/useCheckSocialTask';
import { useEffect, useState } from 'react';
import Button3D from '@/components/common/Button3D';

const SocialTaskDialog = ({
  open,
  setOpen,
  socialTask,
  loadingTasks,
  setLoadingTasks,
}: {
  open: boolean;
  loadingTasks: number[];
  socialTask: ISocialTask;
  setOpen: (value: boolean) => void;
  setLoadingTasks: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const { checkSocialTask } = useCheckSocialTask();

  const [statusTask, setStatusTask] = useState<boolean | null>(null);

  const handleContentClick = (task?: ISocialTask) => {
    if (task) {
      setLoadingTasks((prev) => [...prev, task.id]);
      if (statusTask === false) {
        window.open(task.task_url, '_blank');
      }
      setTimeout(
        () => {
          if (statusTask === false) {
            checkSocialTask.mutate(
              { taskId: task.id },
              {
                onSuccess: () => {
                  setLoadingTasks((prev) => prev.filter((id) => id !== task.id));
                  setStatusTask(true);
                },
                onError: () => {
                  setStatusTask(false);
                  setLoadingTasks((prev) => prev.filter((id) => id !== task.id));
                },
              },
            );
            return;
          }
          setStatusTask(false);
          setLoadingTasks((prev) => prev.filter((id) => id !== task.id));
        },
        (Math.floor(Math.random() * (7 - 3 + 1)) + 3) * 1000,
      );
    }
  };

  useEffect(() => {
    return () => {
      setStatusTask(null);
    };
  }, [open, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex w-full justify-center border-none">
        <div className="relative flex min-h-[342px] w-[350px] flex-col items-center justify-between px-5 py-7">
          <button className="absolute -right-2 -top-2 z-10" onClick={() => setOpen(false)}>
            <CloseIcon className="h-10 w-10" />
          </button>
          <img
            src="./imgs/task-check-in-frame.png"
            alt=""
            className="absolute left-0 top-0 h-full w-full"
          />
          <DialogHeader>
            <DialogTitle className="text3d-sm relative z-10 flex w-full flex-col items-center justify-center gap-4 font-backToSchool text-[24px] leading-none text-white">
              <img src={socialTask.logo} className="h-20 w-20 rounded-full" />
              {socialTask.title}
            </DialogTitle>
          </DialogHeader>
          <div className="relative flex w-full flex-1 flex-col gap-4 pt-4">
            <div className="flex flex-col items-center gap-2">
              <div className="font-semibold text-[#352E23]">Complete task to get</div>
              <div className="flex items-center gap-2">
                <DogCoinIcon className="min-w-8" />
                <div className="text3d-sm font-backToSchool text-[32px] text-[#F5BA0A]">
                  +{formatCurrency(socialTask.reward_number, 2)}
                </div>
              </div>
            </div>

            {statusTask !== null && !statusTask && (
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#C0333280] bg-[#EF403F1A] p-3 font-semibold text-[#922726]">
                <div className="h-10 w-10">
                  <ErrorIcon />
                </div>
                <div>Check again if you have joined</div>
              </div>
            )}

            {!statusTask && (
              <Button3D
                className={cn(
                  'mb-3 h-[50px] w-full',
                  loadingTasks.includes(socialTask.id) && 'pointer-events-none',
                )}
                classBtn={cn(
                  'flex flex-col justify-center items-center border-b border-white !rounded-2xl !z-10 !transition-all !duration-300',
                  loadingTasks.includes(socialTask.id) ? '!bg-[#A9A29D]' : '!bg-[#A9B957]',
                )}
                classBtnBottom={cn(
                  '!rounded-2xl  !z-0 !transition-all !duration-300',
                  loadingTasks.includes(socialTask.id) ? '!bg-[#79716B]' : '!bg-[#656F34]',
                )}
                onClick={() => handleContentClick(socialTask)}
              >
                <div className="text-border flex items-center font-backToSchool">
                  {loadingTasks.includes(socialTask.id) ? (
                    <div className="flex items-end gap-1">
                      <div>Verifying</div>
                      <div className="dot-container pb-[2px]">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                  ) : (
                    'Check the task'
                  )}
                </div>
              </Button3D>
            )}

            {statusTask !== null && statusTask && (
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#A9B957] bg-[#A9B95733] p-3 font-semibold text-[#656F34]">
                <div className="h-10 w-10">
                  <SuccessIcon />
                </div>
                <div>You completed the task and the reward has been paid!</div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialTaskDialog;
