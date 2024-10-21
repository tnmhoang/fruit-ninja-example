import { IOrder, IOrderItem } from '@/types/order';
import { getDifficultyBorderHelper } from './getDifficultyBorderHelper';
import * as _ from 'lodash';
import { getArraysRandomObjectId, getRandomOrderDog } from '@/lib/utils';
export function fetchNewOrderHelper({
  userVolunteerRank,
  objectIdsExits,
  prevOrderDog,
}: {
  userVolunteerRank: number;
  objectIdsExits?: number[];
  prevOrderDog?: number;
}) {
  const userDifficultyBorder = getDifficultyBorderHelper(userVolunteerRank);

  let totalItemOrder = _.random(1, 2);
  let userDifficulty = _.random(userDifficultyBorder.min, userDifficultyBorder.max);
  let order: IOrder = {
    items: [],
    object_tier: userDifficultyBorder.object.tier,
    total: userDifficulty,
    order_dog: getRandomOrderDog(prevOrderDog),
  };

  const objectIds = getArraysRandomObjectId({
    min: userDifficultyBorder.object.id.min,
    max: userDifficultyBorder.object.id.max,
    total: totalItemOrder,
    objectIdsExits,
  });

  while (totalItemOrder > 1) {
    const totalItem = _.random(1, userDifficulty - totalItemOrder + 1);
    let item = {
      // Random object id depend on object tier
      object_id: objectIds[totalItemOrder - 1],
      total: totalItem,
    } as IOrderItem;

    if (
      order.items.length === 0 ||
      (order.items.length === 1 && item.object_id !== order.items[0].object_id)
    ) {
      order.items.push(item);
    } else {
      const objectDifferenceIds = getArraysRandomObjectId({
        min: userDifficultyBorder.object.id.min,
        max: userDifficultyBorder.object.id.max,
        total: totalItemOrder,
        prevObjectId: item.object_id,
        objectIdsExits,
      });

      item.object_id = objectDifferenceIds[totalItemOrder - 1];
      order.items.push(item);
    }

    userDifficulty -= totalItem;
    totalItemOrder--;
  }

  order.items.push({
    object_id: objectIds[totalItemOrder - 1],
    total: userDifficulty,
  } as IOrderItem);
  return order;
}
