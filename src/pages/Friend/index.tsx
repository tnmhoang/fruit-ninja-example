import Button3D from '@/components/common/Button3D';
import {
  AboutIcon,
  AvatarIcon,
  CopyIcon,
  DogCoinIcon,
  InviteIcon,
  QRIcon,
} from '@/components/icons';
import NavMenu from '@/components/layout/NavMenu';
import SectionScreen from '@/components/SectionScreen';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { WEB_APP_LINK } from '@/constants';
import useFriends from '@/hooks/useFriends';
import useProfileStore from '@/hooks/useProfileStore';
import { getName, shareTelegram } from '@/lib/utils';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import InviteQRDialog from './components/InviteQRDialog';
import AboutDialog from '@/components/common/AboutDialog';

const FriendPage = () => {
  const profile = useProfileStore((state) => state.profile);
  const referLink = `${WEB_APP_LINK}?startapp=${profile?.ref_code}`;

  const { data } = useFriends();

  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const [openAbout, setOpenAbout] = useState<boolean>(false);

  const handleInviteFriend = () => {
    window.open(shareTelegram(referLink));
  };

  const handleCopy = () => toast({ title: 'Copied to clipboard!', duration: 3000 });

  return (
    <SectionScreen className="flex flex-1 flex-col pb-0">
      <div className="no-scrollbar relative flex h-full max-h-screen flex-col items-center overflow-y-auto p-4">
        <div
          style={{
            backgroundImage: `url('./imgs/bg-image-frens.png')`,
          }}
          className="absolute left-0 top-0 z-0 h-[301px] w-full bg-cover bg-center bg-no-repeat"
        ></div>
        <div className="text-border-white relative flex h-full w-full flex-col items-center">
          <div className="absolute right-0">
            <button
              className="rounded-full"
              onClick={() => {
                setOpenAbout(true);
              }}
            >
              <AboutIcon className="w-8" />
            </button>
            <AboutDialog
              title="How it works?"
              content={
                <div className="pt-3 font-medium text-[#352E23]">
                  Invite your friends and earn big! Once they start playing, head to the 'Earn' tab
                  to claim your prize. And you’ll also score 10% of their earnings!! More friends =
                  more rewards!
                </div>
              }
              open={openAbout}
              setOpen={setOpenAbout}
            />
          </div>
          <div className="text3d w-full pt-1 font-backToSchool text-[40px] leading-none">FRENS</div>
          <div className="flex w-full flex-col pt-3 font-backToSchool text-[16px] font-semibold text-[#352E23]">
            <span className="max-w-40">
              Invite friends and earn 10% of their rewards! The more friends,
            </span>
            <span className="flex items-center gap-1">
              the more
              <DogCoinIcon className="max-h-5 min-h-5 min-w-5 max-w-5" />
            </span>
          </div>
          <div className="flex w-full gap-1 pt-8">
            <Button3D
              className="h-[50px] min-w-[223px] flex-1"
              classBtn={
                'flex flex-col justify-center items-center border-b border-white !rounded-2xl !z-10 !bg-[#2F90DB]'
              }
              classBtnBottom={'!rounded-2xl !bg-[#2673AF] !z-0'}
              onClick={handleInviteFriend}
            >
              <div className="text-border-blue flex items-center gap-2 font-backToSchool">
                <InviteIcon />
                <div>Invite a friend</div>
              </div>
            </Button3D>
            <CopyToClipboard text={referLink} onCopy={handleCopy}>
              <Button3D
                className="h-[50px] w-[56px]"
                classBtn={
                  'flex flex-col justify-center items-center border-b border-white !rounded-2xl !z-10 !bg-[#2F90DB]'
                }
                classBtnBottom={'!rounded-2xl !bg-[#2673AF] !z-0'}
              >
                <CopyIcon />
              </Button3D>
            </CopyToClipboard>
            <Button3D
              className="h-[50px] w-[56px]"
              classBtn={
                'flex flex-col justify-center items-center border-b border-white !rounded-2xl !z-10 !bg-[#2F90DB]'
              }
              classBtnBottom={'!rounded-2xl !bg-[#2673AF] !z-0'}
              onClick={() => setOpen(true)}
            >
              <QRIcon className="h-[28px] w-[28px]" />
            </Button3D>
            <InviteQRDialog referLink={referLink} open={open} setOpen={setOpen} />
          </div>
          <div className="mb-24 w-full flex-1 overflow-hidden pt-8">
            <div className="relative h-full w-full rounded-3xl border-2 border-[#6A5B46] bg-[#C1AD90] pb-4">
              <div className="absolute -top-5 left-1/2 z-10 flex h-11 w-full max-w-[231px] -translate-x-1/2 transform items-center">
                <img src="./imgs/task-frame.png" alt="" className="absolute h-full w-full" />
                <div className="relative z-10 flex w-full items-center justify-center">
                  <div className="text3d-sm font-backToSchool text-[20px]">
                    Friend List ({profile?.total_ref_count})
                  </div>
                </div>
              </div>
              <ScrollArea className="h-full rounded-xl pt-10">
                <ul className="space-y-[6px] px-2">
                  {data?.data.map((user) => (
                    <li
                      key={user.telegram_id}
                      className="flex items-center justify-between rounded-3xl bg-[#E8E0D5] p-3"
                    >
                      <div className="flex w-full gap-3">
                        <AvatarIcon
                          className="max-h-[43px] min-h-[43px] min-w-[43px] max-w-[43px] rounded-full"
                          username={user.username}
                        />
                        <div className="flex w-full items-center justify-between gap-[3px]">
                          <div className="line-clamp-1 text-sm font-semibold text-[#352E23]">
                            {getName(user)}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
      <NavMenu replace />
    </SectionScreen>
  );
};

export default FriendPage;
