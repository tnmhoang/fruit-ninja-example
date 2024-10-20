import { QUERY_KEYS } from '@/constants';
import useProfileStore from '@/hooks/useProfileStore';
import { fetchUserSocialTask } from '@/services/task';
import { useQuery } from '@tanstack/react-query';

export default function useUserTaskSocial() {
  const token = useProfileStore((state) => state.token);
  return useQuery({
    queryKey: [QUERY_KEYS.TASK_SOCIAL, token],
    queryFn: fetchUserSocialTask,
    enabled: !!token,
  });
}
