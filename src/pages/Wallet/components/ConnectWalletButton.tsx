import Button3D from '@/components/common/Button3D';
import { WalletIcon } from '@/components/icons';
import useProfileMutation from '@/hooks/useProfileMutation';
import useProfileStore from '@/hooks/useProfileStore';
import { cn, shorten } from '@/lib/utils';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useEffect, useMemo, useRef } from 'react';

const ConnectWalletButton = () => {
  const profile = useProfileStore((state) => state.profile);

  const tonWallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const firstProofLoading = useRef<boolean>(true);
  const { updateWalletSubmit } = useProfileMutation();

  const randomString = (length = 12) => {
    const preset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    const len = preset.length - 1;

    let a = '';

    for (a = ''; a.length < length; ) {
      a += preset[(Math.random() * len) | 0];
    }

    return a;
  };

  useEffect(() => {
    if (tonConnectUI && !tonWallet?.connectItems?.tonProof) {
      tonConnectUI.disconnect();
    }
  }, [tonConnectUI, tonWallet]);

  useEffect(() => {
    if (!tonConnectUI) return;

    if (firstProofLoading.current) {
      const nonce = randomString(12);
      // setNonce(nonce);
      tonConnectUI.setConnectRequestParameters({
        state: 'ready',
        value: { tonProof: nonce },
      });
    } else {
      tonConnectUI.setConnectRequestParameters({ state: 'loading' });
    }
  }, [tonConnectUI, firstProofLoading]);

  const tonWalletAddress = useMemo(
    () => profile?.wallet_address ?? tonWallet?.account.address,
    [profile?.wallet_address, tonWallet?.account.address],
  );
  useEffect(() => {
    if (!tonWallet?.account.address) return;

    updateWalletSubmit.mutate(tonWallet?.account.address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tonWallet?.account.address]);

  return (
    <>
      <Button3D
        onClick={() => {
          tonConnectUI.openModal();
        }}
        className={cn(tonWalletAddress ? 'h-[72px]' : 'h-12')}
        classBtn={cn(
          'relative flex flex-col items-start justify-center border-b border-white !rounded-3xl !z-10 ',
          tonWalletAddress ? '!bg-[#E8E0D5]' : '!bg-[#2F90DB]',
        )}
        classBtnBottom={cn(
          '!rounded-3xl !z-0',
          tonWalletAddress ? '!h-[72px] !bg-[#6A5B46]' : '!h-12 !bg-[#2673AF]',
        )}
      >
        {tonWalletAddress ? (
          <div className="relative flex w-full">
            <div className="relative z-10 flex w-full flex-col justify-start gap-[3px] px-[8%]">
              <div className="flex w-full justify-start text-xs text-[#79716B]">Your wallet</div>
              <div className="flex w-full justify-start font-semibold text-[#352E23]">
                {shorten(tonWalletAddress, 15)}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-border-blue flex w-full items-center justify-center gap-2 font-backToSchool text-[16px]">
            <div>
              <WalletIcon />
            </div>
            <div className="mt-1">Connect Wallet</div>
          </div>
        )}
      </Button3D>
    </>
  );
};

export default ConnectWalletButton;
