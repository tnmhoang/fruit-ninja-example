import { useToast } from '@/components/ui/use-toast';
import { QUERY_KEYS } from '@/constants';
import { handleErrorMessage } from '@/lib/axios-instance';
import { fetchCheckGameConfigsTask } from '@/services/game-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCheckGameConfigTask() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const checkGameConfigTask = useMutation({
    mutationFn: (data: { taskId: number }) => fetchCheckGameConfigsTask(data.taskId),
    onSuccess: () => {
      toast({
        title: 'Successfully',
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
    },
    onError: (error) => {
      toast({
        title: handleErrorMessage(error),
        duration: 3000,
      });
    },
  });
  return { checkGameConfigTask };
}
