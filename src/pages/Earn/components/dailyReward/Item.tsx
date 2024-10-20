import Button3D from '@/components/common/Button3D';
import { DogCoinIcon, SuccessIcon } from '@/components/icons';
import { cn, formatCurrency } from '@/lib/utils';
import { GameConfig } from '@/types';

const DailyRewardItem = ({
  isActive,
  isClaimed,
  dailyReward,
  className,
}: {
  isActive: boolean;
  isClaimed: boolean;
  dailyReward: GameConfig;
  className?: string;
}) => {
  return (
    <>
      <div
        className={cn(
          className,
          'relative flex min-w-20 flex-col items-center overflow-hidden rounded-3xl bg-[#E8E0D5] p-1 pb-1 text-white',
        )}
      >
        {isClaimed && <div className="absolute top-0 z-20 h-full w-full bg-[#e8e0d5b2]"></div>}
        <Button3D
          className="h-[34px] w-full"
          classBtn={cn(
            'flex flex-col justify-center items-center border-b border-white !rounded-full !z-10 ',
            !isActive ? '!bg-[#C1AD90]' : '!bg-[#A9B957]',
          )}
          classBtnBottom={'!rounded-full !bg-[#6A5B46] !z-0 !h-7 !-bottom-[3px] '}
          /* style={{
            backgroundColor: !isActive ? '#C1AD90' : '#A9B957',
          }} */
        >
          <div className="text3d-sm flex items-center font-backToSchool">
            Day {dailyReward.level}
          </div>
        </Button3D>
        <div className="relative z-20 mt-2 max-h-9 max-w-9">
          {isClaimed ? <SuccessIcon /> : <DogCoinIcon />}
        </div>
        <div className="text3d-sm flex items-center font-backToSchool">
          +{formatCurrency(dailyReward.reward, 2)}
        </div>
      </div>
    </>
  );
};

export default DailyRewardItem;
