import { IOrder, IOrderItem } from '@/types/order';
import { getDifficultyBorderHelper } from './getDifficultyBorderHelper';
import * as _ from 'lodash';
import { getArraysRandomObjectId } from '@/lib/utils';
export function fetchNewOrderHelper(userVolunteerRank: number) {
  const userDifficultyBorder = getDifficultyBorderHelper(userVolunteerRank);

  let totalItemOrder = _.random(1, 2);
  let userDifficulty = _.random(userDifficultyBorder.min, userDifficultyBorder.max);
  let order: IOrder = {
    items: [],
    object_tier: userDifficultyBorder.object.tier,
    total: userDifficulty,
  };

  const objectIds = getArraysRandomObjectId(
    userDifficultyBorder.object.id.min,
    userDifficultyBorder.object.id.max,
    totalItemOrder,
  );
  while (totalItemOrder > 1) {
    const totalItem = _.random(1, userDifficulty - totalItemOrder + 1);
    order.items.push({
      // Random object id depend on object tier
      object_id: objectIds[totalItemOrder - 1],
      total: totalItem,
    } as IOrderItem);

    userDifficulty -= totalItem;
    totalItemOrder--;
  }

  order.items.push({
    object_id: objectIds[totalItemOrder - 1],
    total: userDifficulty,
  } as IOrderItem);
  return order;
}
