import { useToast } from '@/components/ui/use-toast';
import { QUERY_KEYS } from '@/constants';
import { handleErrorMessage } from '@/lib/axios-instance';
import { updateCheckIn } from '@/services/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useMissionMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const dailyCheckIn = useMutation({
    mutationFn: updateCheckIn,
    onSuccess: async (result) => {
      if (!result) {
        toast({
          title: 'Uh-oh! Unable to claim. Try again',
          duration: 3000,
        });
        return;
      }
      toast({
        title: 'Check in success',
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MISSION_DAILY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
    },
    onError: (error) => {
      toast({
        title: handleErrorMessage(error),
        duration: 3000,
      });
    },
  });

  // const joinTask = useMutation({
  //   mutationFn: (taskId: number) => doTask(taskId),
  //   onSuccess: async (result) => {
  //     if (!result) {
  //       toast({
  //         title: 'Join task failed',
  //         duration: 3000,
  //       });
  //       return;
  //     }
  //     toast({
  //       title: 'Check in success',
  //       duration: 3000,
  //     });
  //     queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MISSION_DAILY] });
  //   },
  //   onError: (error) => {
  //     toast({
  //       title: handleErrorMessage(error),
  //       duration: 3000,
  //     });
  //   },
  // });

  return { dailyCheckIn };
}
