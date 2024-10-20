import { AvatarIcon } from '@/components/icons';
import useProfileStore from '@/hooks/useProfileStore';

const SheetMyProfile = () => {
  const profile = useProfileStore((state) => state.profile);

  return (
    <div className="cursor-pointer rounded-full">
      <AvatarIcon className="rounded-full" username={profile?.username} />
    </div>
  );
};
export default SheetMyProfile;
