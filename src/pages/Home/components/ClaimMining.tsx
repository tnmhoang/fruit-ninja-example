import Button3D from '@/components/common/Button3D';
import { DogCoinIcon } from '@/components/icons';
import { SFX_KEYS } from '@/constants';
import useGameMutation from '@/hooks/useGameMutation';
import useGameStore from '@/hooks/useGameStore';
import useSoundEffect from '@/hooks/useSoundEffect';
import { cn, formatCurrency, secondsToHms } from '@/lib/utils';
import { useMemo } from 'react';

const ClaimMining = () => {
  const [storageHour, miningPerHour, unClaimedMining, balance] = useGameStore((state) => [
    state.storageHour,
    state.miningPerHour,
    state.unClaimedMining,
    state.balance,
  ]);
  const { playSfx } = useSoundEffect();
  const { claimSubmit } = useGameMutation();

  const maxMining = useMemo(() => storageHour * miningPerHour, [miningPerHour, storageHour]);

  const miningTimeLeftInSeconds = useMemo(() => {
    if (!unClaimedMining) return 0;

    return ((maxMining - unClaimedMining) / maxMining) * storageHour * 60;
  }, [maxMining, storageHour, unClaimedMining]);

  const handleClaim = () => {
    if (claimSubmit.isPending) return;

    claimSubmit.mutate();
    playSfx(SFX_KEYS.EARN);
  };

  const progressWidth = useMemo(
    () => (unClaimedMining ? (100 * unClaimedMining) / maxMining : 100),
    [maxMining, unClaimedMining],
  );

  return (
    <Button3D
      className={cn('h-16', miningTimeLeftInSeconds >= 1 && 'pointer-events-none')}
      classBtn={cn(
        '!overflow-hidden relative flex flex-col justify-center items-center border-b border-white !rounded-2xl !z-10 !bg-[#A4ADB4]',
        'before:absolute before:h-full before:bg-[#2F90DB] before:left-0 before:transition-all before:!rounded-l-2xl',
        `before:w-[--before-width]`,
      )}
      classBtnBottom={cn(
        '!overflow-hidden  !rounded-2xl !bg-[#7F868C] !z-0',
        'before:absolute before:w-10 before:h-full before:bg-[#2673AF] before:left-0 before:transition-all before:!rounded-l-2xl',
        `before:w-[--before-width]`,
      )}
      styleBtn={{
        '--before-width': `${progressWidth}%`,
      }}
      styleBtnBottom={{
        '--before-width': `${progressWidth}%`,
      }}
      onClick={handleClaim}
    >
      <div
        className={cn(
          'relative flex items-center gap-2 font-backToSchool text-[20px]',
          miningTimeLeftInSeconds >= 1 ? 'text-white/50' : 'text-white',
        )}
      >
        <div>Farming</div>
        <div className="flex items-center gap-1">
          <span className="max-h-[23px] max-w-[23px]">
            <DogCoinIcon />
          </span>
          <span>{formatCurrency(unClaimedMining ?? 0, 2)}</span>
        </div>
      </div>
      {miningTimeLeftInSeconds >= 1 && (
        <div className="absolute right-[4%] text-xs">{secondsToHms(miningTimeLeftInSeconds)}</div>
      )}
    </Button3D>
  );
};

export default ClaimMining;
