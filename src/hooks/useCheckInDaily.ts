import { GAME_CONFIGS } from '@/constants';
import useGameConfig from '@/hooks/useGameConfig';
import useMissionDaily from '@/hooks/useMissionDaily';
import useMissionMutation from '@/hooks/useMissionMutation';
import { isWithinCurrentDay } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';

export default function useCheckInDaily() {
  const [totalCheckInDays, setTotalCheckInDays] = useState<number>(0);
  const { data, isLoading } = useMissionDaily();
  const { dailyRewards } = useGameConfig();

  const { total_checkin_days = 0, last_checkin_day } = data ?? {};

  useEffect(() => {
    setTotalCheckInDays(total_checkin_days ?? 0);
  }, [total_checkin_days]);

  const remainder = totalCheckInDays % GAME_CONFIGS.DAYS_PER_LOOP;
  const firstDate = totalCheckInDays - remainder + 1;
  const { dailyCheckIn } = useMissionMutation();

  const isTodayCheckedin = useMemo(() => isWithinCurrentDay(last_checkin_day), [last_checkin_day]);

  const currentCheckInNo = useMemo(() => {
    return isTodayCheckedin ? (totalCheckInDays > 0 ? totalCheckInDays : 1) : totalCheckInDays + 1;
  }, [isTodayCheckedin, totalCheckInDays]);

  const [openLuckyWheel, setOpenLuckyWheel] = useState<boolean>(false);

  const handleClaimReward = () => {
    if (dailyCheckIn.isPending) return;
    dailyCheckIn.mutate(void {}, {
      onSuccess: () => {
        const newTotal = totalCheckInDays + 1;
        setTotalCheckInDays(newTotal);
        if (newTotal % GAME_CONFIGS.DAYS_PER_LOOP === 0) setOpenLuckyWheel(true);
      },
    });
  };

  return {
    firstDate,
    dailyRewards,
    currentCheckInNo,
    remainder,
    handleClaimReward,
    openLuckyWheel,
    setOpenLuckyWheel,
    isLoading,
    isTodayCheckedin,
    checkInData: data,
  };
}
