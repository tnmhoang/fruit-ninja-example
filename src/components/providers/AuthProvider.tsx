import { useToast } from '@/components/ui/use-toast';
import useProfile from '@/hooks/useProfile';
import useProfileStore from '@/hooks/useProfileStore';
import { handleErrorMessage } from '@/lib/axios-instance';
import { PropsWithChildren, useEffect, useState } from 'react';
import LevelUpDialog from '../common/LevelUpDialog';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);

  const setProfile = useProfileStore((state) => state.setProfile);
  const profile = useProfileStore((state) => state.profile);
  const { toast } = useToast();

  const { data, error } = useProfile();

  useEffect(() => {
    if (data && profile && data.rank_index > profile.rank_index) {
      setOpen(true);
    }
    setProfile(data);
  }, [setProfile, data]);

  useEffect(() => {
    if (error) toast({ title: handleErrorMessage(error), variant: 'destructive' });
  }, [error, toast]);

  return (
    <>
      {data && <LevelUpDialog open={open} setOpen={setOpen} data={data} />}
      {children}
    </>
  );
};

export default AuthProvider;
