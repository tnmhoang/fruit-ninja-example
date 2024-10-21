import AboutDialog from '@/components/common/AboutDialog';
import Button3D from '@/components/common/Button3D';
import { AboutIcon, DogCoinIcon, ItemUpgradeIcon, UpLevelIcon } from '@/components/icons';
import NavMenu from '@/components/layout/NavMenu';
import { queryClient } from '@/components/providers';
import SectionScreen from '@/components/SectionScreen';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/constants';
import useProfileStore from '@/hooks/useProfileStore';
import { useGetUpgraded, useUpgraded } from '@/hooks/useUpgradeItems';
import { cn, formatCurrency, toTitleCase } from '@/lib/utils';
import { IUpgrade, KeyUpgradeDTO } from '@/types';
import { useState } from 'react';

const UpgradePage = () => {
  const profile = useProfileStore((state) => state.profile);

  const [openAbout, setOpenAbout] = useState<boolean>(false);

  const { data } = useGetUpgraded();

  const { mutate } = useUpgraded();

  const handleUpgrade = (type: keyof IUpgrade) => {
    mutate(type, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.UPGRADED_ITEMS],
        });
        queryClient.refetchQueries({ queryKey: [QUERY_KEYS.PROFILE] });
      },
    });
  };

  return (
    <SectionScreen className="flex flex-1 flex-col">
      <div className="no-scrollbar relative z-10 flex h-full flex-col items-center gap-6 overflow-y-auto px-6">
        <div className="relative flex h-full w-full flex-col items-center gap-2 pb-5">
          <div className="absolute right-0 top-3">
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
                  Maximize your slicing game! Upgrade your <b>Bucks Multiplier</b> for bigger
                  rewards, your <b>Item Booster</b> for extra loot, and the{' '}
                  <b>Passive Bucks Generator</b> to earn more while you’re away. Don’t forget to log
                  in to collect and farm for more gains!
                </div>
              }
              open={openAbout}
              setOpen={setOpenAbout}
            />
          </div>
          <div className="text3d pt-5 font-backToSchool text-[40px] uppercase">UPGRADES</div>
          <div className="relative max-h-40 w-full flex-1">
            <img
              className="absolute inset-0 m-auto h-full max-h-[100vw] object-cover"
              src="./imgs/rocket.png"
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="text-[#352E23]">Your coin balance</div>
            <div className="flex items-center justify-center gap-2">
              <DogCoinIcon className="max-h-10 min-h-10 min-w-10 max-w-10" />
              <div className="text3d font-backToSchool text-[40px]">
                {formatCurrency(profile?.current_coin, 2)}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            {data &&
              profile &&
              Object.keys(data).map((item) => (
                <div
                  key={item}
                  className="rounded-[20px] border border-b-4 border-[#473D2E] bg-[#E8E0D5] p-3"
                >
                  <div className="flex flex-1 flex-col gap-3 text-sm font-semibold text-[#352E23]">
                    <div className="flex items-center gap-2">
                      {item === ('item_per_object' as keyof IUpgrade) ? (
                        <div className="w-10 min-w-10">
                          <ItemUpgradeIcon />
                        </div>
                      ) : (
                        <div className="w-10 min-w-10">
                          <DogCoinIcon />
                        </div>
                      )}
                      <div className="line-clamp-3 flex-1 text-start">
                        {(item as KeyUpgradeDTO) === 'item_per_object' && 'Item Booster Per Object'}
                        {(item as KeyUpgradeDTO) === 'coin_per_object' &&
                          'Bucks Multiplier Per Object'}
                        {(item as KeyUpgradeDTO) === 'passive_coin_per_min' &&
                          'Passive Bucks Generator'}
                      </div>

                      <div
                        className={cn(
                          'flex h-fit cursor-pointer gap-1 rounded-xl border border-[#656F34] bg-[#A9B957] px-3 py-2 text-white hover:bg-[#b4c55d]',
                          data[item as keyof IUpgrade].price > profile.current_coin &&
                            'pointer-events-none opacity-50',
                        )}
                        onClick={() => handleUpgrade(item as keyof IUpgrade)}
                      >
                        <div className="text-border-green">
                          {data && formatCurrency(data[item as keyof IUpgrade].price, 2)}
                        </div>

                        <DogCoinIcon className="w-5" />
                      </div>
                    </div>
                    <div className="flex w-full justify-center rounded-xl border border-[#352E2326] bg-[#E0D6C7] p-2">
                      <div className="flex items-center gap-[6px]">
                        <div className="flex items-center gap-3">
                          <div className="relative flex items-center gap-1">
                            <div className="max-h-6 max-w-6">
                              {item === ('item_per_object' as keyof IUpgrade) ? (
                                <ItemUpgradeIcon className="w-6" />
                              ) : (
                                <DogCoinIcon className="w-6" />
                              )}
                            </div>

                            <div className="flex h-6 items-center justify-end gap-[2px] rounded-full pt-[5px] text-right font-backToSchool text-sm font-medium text-[#352E23]">
                              {formatCurrency(data[item as keyof IUpgrade].current_level, 2)}
                              {(item as KeyUpgradeDTO) === 'passive_coin_per_min' && (
                                <span className="normal-case text-[#A9A29D]">/min</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <UpLevelIcon />
                        <div className="flex items-center gap-3">
                          <div className="relative flex items-center gap-1">
                            <div className="max-h-6 max-w-6">
                              {item === ('item_per_object' as keyof IUpgrade) ? (
                                <ItemUpgradeIcon className="w-6" />
                              ) : (
                                <DogCoinIcon className="w-6" />
                              )}
                            </div>
                            <div className="flex h-fit items-center justify-end gap-[2px] rounded-full pt-[5px] text-right font-backToSchool text-sm font-medium text-[#352E23]">
                              {formatCurrency(data[item as keyof IUpgrade].next_level, 2)}
                              {(item as KeyUpgradeDTO) === 'passive_coin_per_min' && (
                                <span className="normal-case text-[#A9A29D]">/min</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <NavMenu />
    </SectionScreen>
  );
};

export default UpgradePage;
