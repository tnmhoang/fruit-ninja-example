import { QUERY_KEYS } from '@/constants';
import useProfileStore from '@/hooks/useProfileStore';
import { fetchLeaderboard, fetchListLeaderboard } from '@/services/rank';
import { useQuery } from '@tanstack/react-query';

export function useLeaderboard(leagueName?: string) {
  const token = useProfileStore((state) => state.token);

  return useQuery({
    queryKey: [QUERY_KEYS.LEADERBOARD, leagueName, token],
    queryFn: () => fetchLeaderboard(leagueName || ''),
    enabled: !!token && !!leagueName,
  });
}

export function useListLeaderboard() {
  const token = useProfileStore((state) => state.token);

  return useQuery({
    queryKey: [QUERY_KEYS.LEADERBOARD, token],
    queryFn: () => fetchListLeaderboard(),
    enabled: !!token,
  });
}
