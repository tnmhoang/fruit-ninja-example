import useProfileStore from '@/hooks/useProfileStore';
import useSoundEffectStore from '@/hooks/useSoundEffectStore';
import { IOrder, IOrderReward } from '@/types/order';
import { useEffect } from 'react';

export interface IReward {
  coins: number;
  ranking: number;
}

const OrderToast = ({
  open,
  keepPlaying,
  rewards,
  orderCompleted,
}: {
  open: boolean;
  keepPlaying: () => Promise<void>;
  rewards: IOrderReward;
  orderCompleted: IOrder | undefined;
}) => {
  const { isSfxOn } = useSoundEffectStore();
  const { profile } = useProfileStore();
  useEffect(() => {
    if (!open) return;
    if (isSfxOn) {
      const audio = document.getElementById(`audioSound-orderCompleted`);

      (audio as HTMLAudioElement).currentTime = 0.45;
      (audio as HTMLAudioElement).volume = 1;
      (audio as HTMLAudioElement).play();
    }
    window.dataLayer.push({
      event: 'order_completion',
      datalayer_event_name: 'order_completion',
      game: {
        order: 'Cut the Fruit',
        quantity: '10',
        level: '1',
        coins_earned: rewards.coins,
        paws_earned: rewards.ranking,
      },
      user_data: {
        logged_in: true,
        id: profile?.telegram_id,
        username: profile?.username,
        totalCoin: profile?.total_coin,
        rankLevel: profile?.rank_level,
        volunteerRank: profile?.volunteer_rank,
      },
    }),
      keepPlaying();
  }, [open]);

  return (
    <div className="toast-custom hidden w-full" id="toast-custom">
      <div className="flex w-full rounded-2xl border-[2px] border-solid border-[#A9B957] bg-[#DDE3BC] p-3">
        <div className="h-[56px] w-[56px] overflow-hidden rounded-full bg-[#352E23]">
          <img
            src={
              orderCompleted?.order_dog
                ? `./imgs/orders/dogs/dog${orderCompleted.order_dog}.png`
                : './imgs/orders/dogs/dog1.png'
            }
          />
        </div>
        <div className="flex h-full flex-col justify-between pl-2">
          <div className="text-sm font-semibold text-[#473D2E]">Completed order! You get:</div>
          <div className="mt-1 flex">
            <div className="relative flex h-[20px] items-center justify-end rounded-[31px] bg-[#F7F5F180] pl-5 pr-1 pt-2">
              <img
                src="./imgs/orders/ranking.png"
                width={24}
                height={24}
                className="absolute left-[-3px] top-[-2px]"
              />
              <span className="bordered-text font-backToSchool font-bold text-[#BAC779]">
                x{rewards.ranking}
              </span>
            </div>
            <div className="relative ml-2 flex h-[20px] items-center justify-end rounded-[31px] bg-[#F7F5F180] pl-5 pr-1 pt-2">
              <img
                src="./imgs/orders/coin.png"
                width={24}
                height={24}
                className="absolute left-[-5px] top-[-2px]"
              />
              <span className="bordered-text font-backToSchool font-bold text-[#FFE546]">
                x{rewards.coins}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderToast;
