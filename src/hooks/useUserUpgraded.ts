import { QUERY_KEYS } from '@/constants';
import useProfileStore from '@/hooks/useProfileStore';
import { fetchUpgraded } from '@/services/user';
import { useQuery } from '@tanstack/react-query';

export default function useUserUpgraded() {
  const token = useProfileStore((state) => state.token);

  return useQuery({
    queryKey: [QUERY_KEYS.USER_UPGRADED, token],
    queryFn: fetchUpgraded,
    enabled: !!token,
  });
}
