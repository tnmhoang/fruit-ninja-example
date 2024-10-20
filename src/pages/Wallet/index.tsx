import { DogCoinIcon, TonWalletIcon } from '@/components/icons';
import NavMenu from '@/components/layout/NavMenu';
import SectionScreen from '@/components/SectionScreen';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useProfileStore from '@/hooks/useProfileStore';
import { formatCurrency } from '@/lib/utils';
import { POINT_ORDER_BY } from '@/types';
import { Address, TonClient } from '@ton/ton';
import { useTonWallet } from '@tonconnect/ui-react';
import { useEffect, useMemo, useState } from 'react';
import ConnectWalletButton from './components/ConnectWalletButton';

const WalletPage = () => {
  const [currentTab, setCurrentTab] = useState<string>(POINT_ORDER_BY.BALANCES);
  const [balance, setBalance] = useState(0);

  const { profile } = useProfileStore();
  const tonWallet = useTonWallet();

  const tonWalletAddress = useMemo(
    () => profile?.wallet_address ?? tonWallet?.account.address,
    [profile?.wallet_address, tonWallet?.account.address],
  );

  const getBalance = async (walletAddress: string) => {
    const client = new TonClient({
      endpoint: import.meta.env.VITE_TON_ENDPOINT,
    });

    try {
      const parsedAddress = Address.parse(walletAddress);
      const accountInfo = await client.getBalance(parsedAddress);
      if (!accountInfo) return;
      const balanceInTON = Number(BigInt(accountInfo)) / 1e9;
      const formattedBalance = balanceInTON.toFixed(2);

      setBalance(Number(formattedBalance));
    } catch (error) {
      console.error('Error when getting balance of wallet', error);
    }
  };

  useEffect(() => {
    if (tonWalletAddress) {
      getBalance(tonWalletAddress);
    }
  }, []);

  return (
    <SectionScreen className="flex flex-1 flex-col">
      <div className="relative flex-1 px-6">
        <div
          style={{
            backgroundImage: `url('./imgs/bg-image-wallet.png')`,
          }}
          className="absolute left-0 top-0 z-0 h-[301px] w-full bg-cover bg-center bg-no-repeat"
        ></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-full">
            <div className="text3d pt-7 font-backToSchool text-[40px] uppercase">WALLET</div>
            <div className="text-border-white font-backToSchool text-[16px] text-[#352E23]">
              <div>Get real crypto.</div>
              <div>Earn and buy tokens.</div>
            </div>
          </div>

          <div className="w-full pt-10">
            <ConnectWalletButton />
          </div>
          <div className="w-full pt-10">
            <div className="relative w-full rounded-3xl border-2 border-[#6A5B46] bg-[#C1AD90] pb-4">
              <div className="absolute -top-5 left-1/2 z-10 flex h-11 w-full max-w-[152px] -translate-x-1/2 transform items-center">
                <img src="./imgs/task-frame.png" alt="" className="absolute h-full w-full" />
                <div className="relative z-10 flex w-full items-center justify-center">
                  <div className="text3d-sm font-backToSchool text-[20px]">Points</div>
                </div>
              </div>
              <Tabs
                value={currentTab}
                onValueChange={setCurrentTab}
                defaultValue={POINT_ORDER_BY.BALANCES}
                className="px-2 pt-5"
              >
                <TabsList className="font-charka mx-auto mt-3 grid h-fit w-full grid-cols-2 gap-x-1 rounded-full bg-[#8E7A5D] p-1 font-normal">
                  <TabsTrigger
                    value={POINT_ORDER_BY.BALANCES}
                    className="rounded-3xl font-semibold text-[#D7D3D0] data-[state=active]:bg-[#A9B957] data-[state=active]:text-white"
                  >
                    Balances
                  </TabsTrigger>
                  <TabsTrigger
                    value={POINT_ORDER_BY.HISTORY}
                    className="rounded-3xl font-semibold text-[#D7D3D0] data-[state=active]:bg-[#A9B957] data-[state=active]:text-white"
                  >
                    History
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {currentTab === POINT_ORDER_BY.BALANCES ? (
                <ScrollArea className="h-full rounded-xl pt-2">
                  <ul className="max-h-[216px] space-y-[6px] px-2">
                    <li className="flex items-center justify-between rounded-3xl bg-[#E8E0D5] p-3">
                      <div className="flex gap-3">
                        <TonWalletIcon />
                        <div className="flex flex-col gap-[3px]">
                          <div className="text-sm font-semibold text-[#352E23]">TON</div>
                          <div className="flex items-center gap-3 text-xs">
                            <div className="text-[#79716B]">{balance}</div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center pt-4">
                  <img src="./imgs/dog-coming-soon.png" width={166} height={150} />
                  <div>No transactions</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <NavMenu replace />
    </SectionScreen>
  );
};

export default WalletPage;
