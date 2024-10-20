import { QUERY_KEYS } from '@/constants';
import useProfileStore from '@/hooks/useProfileStore';
import { fetchDailyTask } from '@/services/task';
import { useQuery } from '@tanstack/react-query';

export default function useMissionDaily() {
  const token = useProfileStore((state) => state.token);

  return useQuery({
    queryKey: [QUERY_KEYS.MISSION_DAILY, token],
    queryFn: fetchDailyTask,
    enabled: !!token,
  });
}
