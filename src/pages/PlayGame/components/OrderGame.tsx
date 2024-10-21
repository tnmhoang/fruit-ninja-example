import Button3D from '@/components/common/Button3D';
import { cn } from '@/lib/utils';
import { IOrder } from '@/types/order';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { tier1Items, tier2Items, tier3Items, tier4Items } from '../constant';

const OrderGame = ({
  listOrder,
  itemPerObject,
}: {
  listOrder: IOrder[];
  itemPerObject: number;
}) => {
  const displayImageItem = (id: number) => {
    const item = tier1Items
      .concat(tier2Items)
      .concat(tier3Items)
      .concat(tier4Items)
      .filter((el) => el.object_id === id)[0];
    return item?.img_url;
  };

  return (
    <div className="task-board absolute top-[20px] z-[15] flex w-full justify-center">
      <TransitionGroup className="task-list flex w-full justify-around !gap-0" component="div">
        {listOrder.map((order, index) => (
          <CSSTransition
            key={index}
            timeout={1000}
            classNames={index === 0 ? 'task-slide' : 'task-fade'}
          >
            <div className="task">
              <div className="absolute left-[20px] top-[-15px] z-[11]">
                <img src="./imgs/order-rope.png" />
              </div>
              <Button3D
                className={cn('mx-1 mt-[20px] h-[86px] max-w-[180px]')}
                classBtn={cn(
                  'flex flex-col justify-center items-center border-b border-white !rounded-2xl !z-10 !bg-[#A9B957]',
                  '!bg-[#d5d4af]',
                  'pointer-events-none',
                )}
                classBtnBottom={cn('!rounded-2xl !bg-[#656F34] !z-0', '!#c2b7aa')}
              >
                <div className="flex w-full justify-center gap-2 px-2">
                  <div className="h-[56px] w-[56px] overflow-hidden rounded-full bg-[#352E23]">
                    <img
                      src={
                        order.order_dog
                          ? `./imgs/orders/dogs/dog${order.order_dog}.png`
                          : './imgs/orders/dogs/dog1.png'
                      }
                    />
                  </div>
                  <div className="ml-2 flex flex-1 flex-col justify-center">
                    {order.items.map((item, idx) => {
                      return (
                        <div
                          className="relative my-1 flex h-[22px] w-[90px] items-center justify-center bg-[#6a5b4680] p-2"
                          style={{ borderRadius: 20 }}
                          key={idx}
                        >
                          <img
                            src={displayImageItem(item.object_id)}
                            width={32}
                            className="absolute -left-4 z-30 object-contain"
                          />
                          <div className="text-border flex items-center pl-2 pt-1 font-backToSchool">
                            {item.completed * itemPerObject > item.total
                              ? item.total
                              : item.completed * itemPerObject}{' '}
                            / {item.total}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Button3D>
              <div className="absolute right-[20px] top-[-15px] z-[11]">
                <img src="./imgs/order-rope.png" />
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default OrderGame;
