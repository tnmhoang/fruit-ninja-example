import { useEffect, useState } from 'react';
import { QUERY_KEYS } from '@/constants';
import useProfileStore from '@/hooks/useProfileStore';
import { fetchFriends } from '@/services/user';
import { useMutation, useQuery } from '@tanstack/react-query';
import { APIResponseWithPaging, User } from '@/types';

export default function useFriends() {
  const token = useProfileStore((state) => state.token);

  const [friendsData, setFriendsData] = useState<APIResponseWithPaging<User> | undefined>();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.FRIENDS, token],
    queryFn: () => fetchFriends(1),
    enabled: !!token,
  });

  const handleGetFriends = useMutation({
    mutationFn: (page: number) => fetchFriends(page),
    onSuccess: async (data) => {
      if (!data) {
        return;
      }

      setFriendsData((prev) => ({
        ...data,
        docs: !prev?.docs ? data?.docs : prev.docs.concat(data.docs || []),
      }));
    },
  });

  useEffect(() => {
    if (!data) return;

    setFriendsData(data);
  }, [data]);

  return { handleGetFriends, data: friendsData, isLoading };
}
