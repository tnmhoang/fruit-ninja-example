export interface IOrder {
  items: IOrderItem[];
  object_tier: number;
  total: number;
  image_url?: string;
}

export interface IOrderItem {
  object_id: number;
  total: number;
  completed: number;
}

export interface IOrderReward {
  coins: number;
  ranking: number;
}

export interface ObjectInterface {
  tier: number;
  id: {
    min: number;
    max: number;
  };
  coins: number;
  items: number;
}

export interface BorderValueRankForDifficulty {
  rank: number;
  maxDifficulty: number;
  object: ObjectInterface;
}

export interface DifficultOrderBorder {
  min: number;
  max: number;
  object: ObjectInterface;
}
