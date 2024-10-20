import { QUERY_KEYS } from '@/constants';
import useProfileStore from '@/hooks/useProfileStore';
import { fetchGameConfigs } from '@/services/game-config';
import { CONFIG_TYPE } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function useGameConfig() {
  const token = useProfileStore((state) => state.token);
  const profile = useProfileStore((state) => state.profile);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GAME_CONFIGS, token],
    queryFn: fetchGameConfigs,
    enabled: !!token,
  });
  const levels = useMemo(
    () =>
      data
        ?.filter((item) => item.config_type === CONFIG_TYPE.LEVEL)
        .sort((a, b) => b.level - a.level),
    [data],
  );

  const currentLevel = useMemo(
    () => levels?.find((item) => item.level === profile?.user_level),
    [levels, profile?.user_level],
  );

  const dailyRewards = useMemo(
    () =>
      data
        ?.filter((item) => item.config_type === CONFIG_TYPE.DAILY_REWARDS)
        .sort((a, b) => a.level - b.level),
    [data],
  );

  const upgrades = useMemo(
    () =>
      data
        ?.filter((item) => item.config_type === CONFIG_TYPE.UPGRADE)
        .sort((a, b) => a.level - b.level),
    [data],
  );

  const friends = useMemo(
    () =>
      data
        ?.filter((item) => item.config_type === CONFIG_TYPE.REF_POINTS && item.level >= 2)
        .sort((a, b) => a.level - b.level),
    [data],
  );

  const leagues = useMemo(
    () =>
      data
        ?.filter((item) => item.config_type === CONFIG_TYPE.LEADER_BOARD)
        .sort((a, b) => a.level - b.level),
    [data],
  );

  const dailyMission = useMemo(
    () =>
      data
        ?.filter((item) => item.config_type === CONFIG_TYPE.DAILY_MISSION)
        .sort((a, b) => a.level - b.level),
    [data],
  );

  const wallet = useMemo(
    () =>
      data
        ?.filter((item) => item.config_type === CONFIG_TYPE.WALLET_CONNECT)
        .sort((a, b) => a.level - b.level),
    [data],
  );

  return { levels, currentLevel, dailyRewards, dailyMission, upgrades, friends, leagues, wallet };
}
