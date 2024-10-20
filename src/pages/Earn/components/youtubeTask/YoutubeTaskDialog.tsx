import Button3D from '@/components/common/Button3D';
import { CloseIcon, OpenLinkIcon } from '@/components/icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useCheckSocialTask from '@/hooks/useCheckSocialTask';
import { cn } from '@/lib/utils';
import { ISocialTask } from '@/types/task';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const YoutubeTaskDialog = ({
  open,
  setOpen,
  taskYoutube,
  loadingTasks,
  setLoadingTasks,
}: {
  open: boolean;
  loadingTasks: number[];
  taskYoutube: ISocialTask;
  setOpen: (value: boolean) => void;
  setLoadingTasks: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const { checkSocialTask } = useCheckSocialTask();

  const [keyword, setKeyword] = useState<string>();

  const handleContentClick = (task?: ISocialTask) => {
    if (task) {
      setLoadingTasks((prev) => [...prev, task.id]);
      setTimeout(
        () => {
          checkSocialTask.mutate(
            { taskId: task.id, keyword },
            {
              onSuccess: () => {
                setOpen(false);
              },
              onSettled: () => {
                setLoadingTasks((prev) => prev.filter((id) => id !== task.id));
                setKeyword('');
              },
            },
          );
        },
        (Math.floor(Math.random() * (7 - 3 + 1)) + 3) * 1000,
      );
    }
  };

  useEffect(() => {
    return () => setKeyword('');
  }, [open, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex w-full justify-center border-none">
        <div className="relative flex w-full max-w-96 flex-col items-center justify-between px-5 py-7">
          <button className="absolute -right-2 -top-2 z-10" onClick={() => setOpen(false)}>
            <CloseIcon className="h-10 w-10" />
          </button>
          <img
            src="./imgs/task-check-in-frame.png"
            alt=""
            className="absolute left-0 top-0 h-full w-full"
          />
          <DialogHeader>
            <DialogTitle className="text3d-sm relative z-10 flex w-full flex-col items-center justify-center gap-[3px] text-center font-backToSchool text-[24px] leading-none tracking-widest text-white">
              <img src={'./imgs/youtube.png'} className="h-20 w-20" />
              Watch the video to discover the hidden code and unlock rewards!
            </DialogTitle>
          </DialogHeader>
          <div className="relative flex w-full flex-1 flex-col gap-4 pt-4">
            <div className="flex w-full flex-col gap-5 rounded-2xl bg-[#D0C1AC] px-2 py-3">
              <div className="flex items-center gap-2">
                <div className="flex max-h-8 min-h-8 min-w-8 max-w-8 items-center justify-center rounded-full border-2 border-[#352E23] bg-[#E0D6C7] font-backToSchool text-[20px]">
                  1
                </div>
                <div className="flex w-full flex-col overflow-hidden">
                  <div className="line-clamp-1 font-semibold">Watch video via link</div>
                  <Link
                    to={taskYoutube.task_url}
                    target="_blank"
                    className="flex items-center gap-2 overflow-hidden font-backToSchool text-[#2F90DB]"
                  >
                    <div className="line-clamp-1 max-w-32">{taskYoutube.task_url}</div>
                    <span className="w-full">
                      <OpenLinkIcon />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex gap-2">
                <div
                  className={cn(
                    'relative flex max-h-8 min-h-8 w-full min-w-8 max-w-8 items-center justify-center rounded-full border-2 border-[#352E23] bg-[#E0D6C7] font-backToSchool text-[20px]',
                    'before:absolute before:-top-full before:h-full before:border before:border-dashed',
                  )}
                >
                  2
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="font-semibold">Enter the code</div>
                  <input
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                    type="text"
                    placeholder="Ex. HB47836V"
                    className="w-full rounded-xl border border-b-4 border-[#6A5B46] bg-[#E8E0D5] px-3 py-3 font-backToSchool text-[#A9A29D] outline-none"
                  />
                </div>
              </div>
            </div>

            <Button3D
              className={cn(
                'mb-3 h-[50px] w-full',
                loadingTasks.includes(taskYoutube.id) && 'pointer-events-none',
              )}
              classBtn={cn(
                'flex flex-col justify-center items-center border-b border-white !rounded-2xl !z-10 !bg-[#A9B957]',
                loadingTasks.includes(taskYoutube.id) ? '!bg-[#A9A29D]' : '!bg-[#A9B957]',
              )}
              classBtnBottom={cn(
                '!rounded-2xl !bg-[#656F34] !z-0',
                loadingTasks.includes(taskYoutube.id) ? '!bg-[#79716B]' : '!bg-[#656F34]',
              )}
              onClick={() => handleContentClick(taskYoutube)}
            >
              <div className="text-border flex items-center font-backToSchool">
                {loadingTasks.includes(taskYoutube.id) ? (
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default YoutubeTaskDialog;
