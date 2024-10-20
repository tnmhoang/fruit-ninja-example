import Button3D from '@/components/common/Button3D';
import { cn, formatCurrency } from '@/lib/utils';
import useProfileStore from '@/hooks/useProfileStore';
import { AboutIcon } from '@/components/icons';
import { useState } from 'react';
import AboutDialog from '@/components/common/AboutDialog';

export default function HeaderGame() {
  const { profile } = useProfileStore();
  const [openAbout, setOpenAbout] = useState<boolean>(false);

  return (
    <div
      className="relative flex h-[66px] items-center px-4"
      style={{ backgroundImage: `url('./imgs/bg-header-game.png')` }}
    >
      <div className="flex gap-5">
        <Button3D
          className="pointer-events-none relative flex h-[30px] w-[89px] items-center justify-center"
          classBtn={cn(
            'flex flex-col justify-center items-center border-b border-white !rounded-full !z-10 ',
          )}
          classBtnBottom={'!rounded-full !bg-[#6A5B46] !z-0 !h-7 !-bottom-[3px] '}
          styleBtn={{ background: '#D0C1AC' }}
        >
          <img src="./imgs/orders/coin.png" className="absolute left-[-12px] h-[36px] w-[36px]" />{' '}
          <div className="text3d-sm flex items-center pl-2 pt-1 font-backToSchool">
            {formatCurrency(profile?.total_coin, 2)}
          </div>
        </Button3D>
        <Button3D
          className="pointer-events-none relative flex h-[30px] w-[89px] items-center justify-center"
          classBtn={cn(
            'flex flex-col justify-center items-center border-b border-white !rounded-full !z-10 ',
          )}
          classBtnBottom={'!rounded-full !bg-[#6A5B46] !z-0 !h-7 !-bottom-[3px] '}
          styleBtn={{ background: '#D0C1AC' }}
        >
          <img src="./imgs/orders/ranking.png" className="absolute left-[-12px] w-[29px]" />{' '}
          <div className="text3d-sm flex items-center pl-1 pt-1 font-backToSchool">
            {formatCurrency(profile?.volunteer_rank, 2)}
          </div>
        </Button3D>
      </div>
      <div className="absolute right-2 top-4">
        <button
          className="rounded-full"
          onClick={() => {
            setOpenAbout(true);
          }}
        >
          <AboutIcon className="w-8" />
        </button>
        <AboutDialog
          title="How it works?"
          content={
            <div className="min-h-28 pt-3 font-medium text-[#352E23]">
              Slice and dice those tasty treats to complete orders. Don’t forget to upgrade to
              unlock more rewards.
            </div>
          }
          open={openAbout}
          setOpen={setOpenAbout}
        />
      </div>
    </div>
  );
}
