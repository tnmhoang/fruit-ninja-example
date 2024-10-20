import { useToast } from '@/components/ui/use-toast';
import { QUERY_KEYS } from '@/constants';
import useGameStore from '@/hooks/useGameStore';
import useProfileStore from '@/hooks/useProfileStore';
import { handleErrorMessage } from '@/lib/axios-instance';
import { claimMiningSubmit } from '@/services/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useGameMutation() {
  const { toast } = useToast();
  const setProfile = useProfileStore((state) => state.setProfile);
  const [claimMining, increaseBalance, unClaimedMining, resetUnClaimedMining] = useGameStore(
    (state) => [
      state.claimMining,
      state.increaseBalance,
      state.unClaimedMining,
      state.resetUnClaimedMining,
    ],
  );
  const queryClient = useQueryClient();

  const claimSubmit = useMutation({
    mutationFn: () => claimMiningSubmit(),
    onSuccess: async (result) => {
      if (!result) {
        toast({
          title: 'Uh-oh! Unable to claim. Try again',
          duration: 3000,
        });
        return;
      }
      claimMining();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PROFILE],
      });
    },
    onError: (error) => {
      toast({
        title: handleErrorMessage(error),
        duration: 3000,
      });
    },
  });

  return { claimSubmit };
}
