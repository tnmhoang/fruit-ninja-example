import { useToast } from '@/components/ui/use-toast';
import { QUERY_KEYS } from '@/constants';
import useProfileStore from '@/hooks/useProfileStore';
import { handleErrorMessage } from '@/lib/axios-instance';
import { fetchUpgraded, upgradeItem } from '@/services/upgrade';
import { IUpgrade } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetUpgraded() {
  const token = useProfileStore((state) => state.token);

  return useQuery({
    queryKey: [QUERY_KEYS.UPGRADED_ITEMS, token],
    queryFn: fetchUpgraded,
    enabled: !!token,
  });
}

export function useUpgraded() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (type: keyof IUpgrade) => upgradeItem(type),
    onSuccess: async (result) => {
      if (!result) {
        toast({
          title: 'Upgrade attempt failed! ',
          duration: 3000,
        });
      }
    },
    onError: (error) => {
      toast({
        title: handleErrorMessage(error),
        duration: 3000,
      });
    },
  });
}
