import LinkExternal from '@/components/LinkExternal';
import {
  AboutIcon,
  ArrowRightIcon,
  CloseIcon,
  DiscordSettingIcon,
  FacebookSettingIcon,
  GithubSettingIcon,
  InstagrammSettingIcon,
  LinkedinSettingIcon,
  SoundIcon,
  SoundOffIcon,
  SoundOnIcon,
  TelegramSettingIcon,
  TiktokSettingIcon,
  TwitterSettingIcon,
  YoutubeSettingIcon,
} from '@/components/icons';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { APP_URLS } from '@/constants';
import useSoundEffectStore from '@/hooks/useSoundEffectStore';
import { cn } from '@/lib/utils';
import { CONFIG_LINK_SOCIAL } from '@/types';
import { useNavigate } from 'react-router-dom';

const SettingDialog = ({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) => {
  // const [isSoundOn, setSoundOn] = useState<boolean>(true);
  const { isBgmOn, isSfxOn, toggleBgm, toggleSfx } = useSoundEffectStore();

  const navigate = useNavigate();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex h-full items-center justify-center border-none">
        <div className="relative flex min-h-[307px] w-[319px] flex-col items-center gap-5 px-5 py-7">
          <button className="absolute -right-2 -top-2 z-10" onClick={() => setOpen(false)}>
            <CloseIcon className="h-10 w-10" />
          </button>
          <img src="./imgs/qr-frame.png" alt="" className="absolute left-0 top-0 h-full w-full" />
          <AlertDialogHeader>
            <AlertDialogTitle className="text3d-sm relative z-10 flex w-full justify-center gap-[3px] font-backToSchool text-[24px] leading-none text-white">
              Setting
            </AlertDialogTitle>
            <AlertDialogDescription className="hidden"></AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex w-full flex-col gap-5">
            <div>
              <div
                className="relative flex min-h-[60px] w-full p-3"
                onClick={() => navigate(APP_URLS.ABOUT)}
              >
                <img
                  src="./imgs/setting-frame.png"
                  alt=""
                  className="absolute left-0 top-0 h-full w-full"
                />
                <div className="relative flex w-full items-center gap-2">
                  <AboutIcon className="w-9" />
                  <div className="flex-1 font-semibold">About the project</div>
                  <ArrowRightIcon className="w-5" />
                </div>
              </div>
              <div className="relative flex min-h-[60px] w-full p-3">
                <img
                  src="./imgs/setting-frame.png"
                  alt=""
                  className="absolute left-0 top-0 h-full w-full"
                />
                <div className="relative flex w-full items-center gap-2">
                  <SoundIcon className="w-9" />
                  <div className="flex-1 font-semibold">Background music</div>
                  <div
                    className={cn(
                      'relative h-6 min-w-11 cursor-pointer rounded-full border-2 border-[#E0D6C7]',
                      isBgmOn ? 'bg-[#656F34]' : 'bg-[#6A5B46]',
                    )}
                    onClick={toggleBgm}
                  >
                    <div className="h-full w-full rounded-full border-2 border-[#352E23]">
                      <div className="h-full w-full rounded-full border-y-2 border-b-[#E0D6C766] border-t-[#352E23B0]"></div>
                    </div>
                    <button
                      className={cn(
                        'absolute top-1/2 h-6 w-6 -translate-y-1/2 transform overflow-hidden rounded-full border-2 transition-all',
                        isBgmOn
                          ? 'translate-x-full border-[#352E23]'
                          : '-translate-x-1 border-[#33381A]',
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-full w-full items-center justify-center rounded-full border',
                          isBgmOn
                            ? 'border-[#DDE3BC] bg-[#A9B957]'
                            : 'border-[#E0D6C7] bg-[#B19874]',
                        )}
                      >
                        {isBgmOn ? <SoundOnIcon /> : <SoundOffIcon />}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative flex min-h-[60px] w-full p-3">
                <img
                  src="./imgs/setting-frame.png"
                  alt=""
                  className="absolute left-0 top-0 h-full w-full"
                />
                <div className="relative flex w-full items-center gap-2">
                  <SoundIcon className="w-9" />
                  <div className="flex-1 font-semibold">Sound Effect</div>
                  <div
                    className={cn(
                      'relative h-6 min-w-11 cursor-pointer rounded-full border-2 border-[#E0D6C7]',
                      isSfxOn ? 'bg-[#656F34]' : 'bg-[#6A5B46]',
                    )}
                    onClick={toggleSfx}
                  >
                    <div className="h-full w-full rounded-full border-2 border-[#352E23]">
                      <div className="h-full w-full rounded-full border-y-2 border-b-[#E0D6C766] border-t-[#352E23B0]"></div>
                    </div>
                    <button
                      className={cn(
                        'absolute top-1/2 h-6 w-6 -translate-y-1/2 transform overflow-hidden rounded-full border-2 transition-all',
                        isSfxOn
                          ? 'translate-x-full border-[#352E23]'
                          : '-translate-x-1 border-[#33381A]',
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-full w-full items-center justify-center rounded-full border',
                          isSfxOn
                            ? 'border-[#DDE3BC] bg-[#A9B957]'
                            : 'border-[#E0D6C7] bg-[#B19874]',
                        )}
                      >
                        {isSfxOn ? <SoundOnIcon /> : <SoundOffIcon />}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center gap-2">
              <div className="font-semibold">Stay in touch!</div>
              <div className="flex max-w-56 flex-wrap justify-center gap-2">
                <LinkExternal
                  children={<InstagrammSettingIcon className="w-8" />}
                  href={CONFIG_LINK_SOCIAL.INSTAGRAM}
                />
                <LinkExternal children={<GithubSettingIcon className="w-8" />} />
                <LinkExternal
                  children={<TiktokSettingIcon className="w-8" />}
                  href={CONFIG_LINK_SOCIAL.TIKTOK}
                />
                <LinkExternal
                  children={<LinkedinSettingIcon className="w-8" />}
                  href={CONFIG_LINK_SOCIAL.LINKEDIN}
                />
                <LinkExternal children={<FacebookSettingIcon className="w-8" />} />
                <LinkExternal
                  children={<DiscordSettingIcon className="w-8" />}
                  href={CONFIG_LINK_SOCIAL.DISCORD}
                />
                <LinkExternal
                  children={<YoutubeSettingIcon className="w-8" />}
                  href={CONFIG_LINK_SOCIAL.YOUTUBE}
                />
                <LinkExternal
                  children={<TelegramSettingIcon className="w-8" />}
                  href={CONFIG_LINK_SOCIAL.TELEGRAM}
                />
                <LinkExternal
                  children={<TwitterSettingIcon className="w-8" />}
                  href={CONFIG_LINK_SOCIAL.X}
                />
              </div>
              <div className="text-[12px] text-[#79716B]">Version 1.0.0</div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettingDialog;
