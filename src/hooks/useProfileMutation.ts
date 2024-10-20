import { useToast } from '@/components/ui/use-toast';
import { handleErrorMessage } from '@/lib/axios-instance';
import { updateWallet } from '@/services/user';
import { useMutation } from '@tanstack/react-query';

export default function useProfileMutation() {
  const { toast } = useToast();

  const updateWalletSubmit = useMutation({
    mutationFn: (walletAddress: string) => updateWallet(walletAddress),
    onSuccess: async (result) => {
      if (!result) {
        toast({
          title: 'Connection error! Couldn’t fetch your wallet. Try again',
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

  return { updateWalletSubmit };
}
