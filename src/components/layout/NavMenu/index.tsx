import Button3D from '@/components/common/Button3D';
import { EarnIcon, FriendIcon, HomeIcon, PlayIcon, Upgrade } from '@/components/icons';
import { APP_URLS, SFX_KEYS } from '@/constants';
import { cn } from '@/lib/utils';
import { PropsWithClassName } from '@/types';
import 'react-awesome-button/dist/styles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import useSoundEffect from '@/hooks/useSoundEffect';
const menus = [
  { title: 'Home', url: APP_URLS.HOME, icon: HomeIcon },
  { title: 'Earn', url: APP_URLS.EARN, icon: EarnIcon },
  { title: 'Play', url: APP_URLS.PLAY_GAME, icon: PlayIcon },
  { title: 'Frens', url: APP_URLS.FRIEND_PAGE, icon: FriendIcon },
  { title: 'Upgrade', url: APP_URLS.UPGRADE, icon: Upgrade },
];

const NavMenu = ({
  className = 'px-4 pb-6',
  replace = false,
}: PropsWithClassName & { replace?: boolean }) => {
  const location = useLocation();

  const navigate = useNavigate();
  const { playSfx } = useSoundEffect();

  const selectType = (type: string): SFX_KEYS => {
    switch (type) {
      case 'Home':
        return SFX_KEYS.HOME;
      case 'Earn':
        return SFX_KEYS.EARN;
      case 'Play':
        return SFX_KEYS.PLAY;
      case 'Frens':
        return SFX_KEYS.FRENS;
      case 'Upgrade':
        return SFX_KEYS.UPGRADE;
      default:
        return SFX_KEYS.NULL;
    }
  };

  return (
    <nav className={(cn(className), 'fixed bottom-0 left-0 right-0 z-50 text-white')}>
      <div className="relative h-[96px] w-full backdrop-blur-xl">
        <div className="absolute inset-0 flex items-center px-4">
          <ul className="grid w-full grid-cols-5 items-end justify-around">
            {menus.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <li key={item.title} className="flex items-center justify-center">
                  <Button3D
                    className={cn(isActive ? 'h-[58px] w-[69px]' : 'h-[52px] w-[60px]')}
                    classBtn={cn(
                      'flex flex-col justify-center items-center border-b border-white !rounded-2xl',
                      isActive ? '!bg-[#EF403F]' : '!bg-[#C1AD90]',
                    )}
                    classBtnBottom={cn(
                      '!rounded-2xl',
                      isActive ? '!bg-[rgba(196,51,51,0.8)]' : '!bg-[rgb(163,147,122,0.9)]',
                    )}
                    onClick={() => {
                      const type = selectType(item.title);
                      // if (!isActive && type !== SFX_KEYS.PLAY) {
                      //   playSfx(type);
                      // }
                      playSfx(type);
                      navigate(item.url);
                    }}
                  >
                    <span
                      className={cn(
                        'flex max-h-10 max-w-12 flex-1 items-end',
                        isActive ? '-translate-y-1 [&>svg]:h-[53px] [&>svg]:w-[53px]' : '',
                      )}
                    >
                      {item.icon()}
                    </span>
                    <span className="pb-1 text-xs">{item.title}</span>
                  </Button3D>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
