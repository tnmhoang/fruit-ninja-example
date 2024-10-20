import { useToast } from '@/components/ui/use-toast';
import { QUERY_KEYS } from '@/constants';
import { handleErrorMessage } from '@/lib/axios-instance';
import { fetchCheckSocialTask } from '@/services/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCheckSocialTask() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const checkSocialTask = useMutation({
    mutationFn: (data: { taskId: number; keyword?: string }) =>
      fetchCheckSocialTask(data.taskId, data.keyword),

    onSuccess: () => {
      toast({
        title: 'Successfully',
        duration: 3000,
      });
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.TASK_SOCIAL],
      });
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
  return { checkSocialTask };
}
