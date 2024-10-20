import Button3D from '@/components/common/Button3D';
import useCheckInDaily from '@/hooks/useCheckInDaily';
import DailyRewardItem from './Item';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CloseIcon } from '@/components/icons';
import clsx from 'clsx';

const DailyReward = ({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) => {
  const {
    firstDate,
    dailyRewards,
    currentCheckInNo,
    remainder,
    handleClaimReward,
    isTodayCheckedin,
  } = useCheckInDaily();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex w-full items-center justify-center border-none">
        <div className="relative flex min-h-[450px] w-[319px] flex-col items-center justify-between px-5 py-7">
          <button className="absolute -right-2 -top-2 z-10" onClick={() => setOpen(false)}>
            <CloseIcon className="h-10 w-10" />
          </button>
          <img
            src="./imgs/task-check-in-frame.png"
            alt=""
            className="absolute left-0 top-0 h-full w-full"
          />
          <DialogHeader>
            <DialogTitle className="text3d-sm relative z-10 flex w-full justify-center gap-[3px] font-backToSchool text-[24px] leading-none text-white">
              Daily Check-in
            </DialogTitle>
          </DialogHeader>
          <div className="flex w-full flex-col items-center justify-center gap-2 pt-4">
            <div className="grid w-full grid-cols-3 gap-2">
              {dailyRewards &&
                dailyRewards.map((dailyReward, index) => (
                  <DailyRewardItem
                    key={index}
                    isActive={currentCheckInNo === firstDate + index}
                    isClaimed={remainder > index}
                    dailyReward={dailyReward}
                    className={clsx({ 'col-span-full': index === dailyRewards.length - 1 })}
                  />
                ))}
            </div>
            <Button3D
              className={cn('mx-2 h-[50px] w-full', isTodayCheckedin && 'pointer-events-none')}
              classBtn={cn(
                'flex flex-col justify-center items-center border-b border-white !rounded-2xl !z-10 !bg-[#A9B957]',
                isTodayCheckedin && '!bg-[#d5d4af]',
              )}
              classBtnBottom={cn('!rounded-2xl !bg-[#656F34] !z-0', isTodayCheckedin && '!#c2b7aa')}
              onClick={handleClaimReward}
            >
              <div className="text-border flex items-center font-backToSchool">Check-in</div>
            </Button3D>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailyReward;
