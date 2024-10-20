import { QUERY_KEYS } from '@/constants';
import useProfileStore from '@/hooks/useProfileStore';
import { http } from '@/lib/axios-instance';
import { fetchProfile } from '@/services/user';
import { useQuery } from '@tanstack/react-query';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';

export default function useProfile() {
  const token = useProfileStore((state) => state.token);

  const { initDataRaw, startParam } = useLaunchParams();
  const setToken = useProfileStore((state) => state.setToken);

  useEffect(() => {
    http.setAuthorizationHeader(initDataRaw);
    setToken(initDataRaw);
  }, [initDataRaw, setToken]);

  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE, token, startParam],
    queryFn: () => fetchProfile(startParam),
    enabled: !!token,
  });
}
