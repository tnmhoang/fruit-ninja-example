import { PropsWithChildren } from 'react';

export type PropsWithClassName = { className?: string };
export type PropsWithChildrenAndClassName = PropsWithChildren & { className?: string };

export type APIResponseWithPaging<T> = {
  docs?: T[];
  data: T[];
  meta: { itemsPerPage: number; totalItems: number; currentPage: number; totalPages: number };
  totalDocs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage?: number;
  page: number;
  pagingCounter: number;
  prevPage?: number;
};

export type UserPublic = {
  telegram_id: string;
  first_name: string;
  last_name: string;
  username?: string;
  user_level: number;
};

interface CurrentUser extends User {
  user_current__rank: string;
}

export type UserRank = {
  top_users: User[];
  current_user: CurrentUser;
};

export type LeaderboardLevel = {
  level: string;
  min: number;
};

export type ConfigCheckin = {
  type: CONFIG_TYPE;
  missions_id: number;
  last_checkin: Date;
};

export type Rank_level =
  | 'HAPPY_PAWS'
  | 'FAITHFUL_COMPANIONS'
  | 'TAIL_GUARDIANS'
  | 'CARING_HEARTS'
  | 'GRAND_PROTECTORS'
  | 'DOG_HEROES'
  | 'FLUFFY_CHAMPIONS'
  | 'DEVOTED_RESQUERS'
  | 'LEGENDS_OF_KINDNESS';

export type User = {
  rank_level: Rank_level;
  telegram_id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium: boolean;
  avatar?: string | null;
  ref_code?: string;
  ref_by?: number | null;
  current_coin: number;
  total_coin: number;
  volunteer_rank: number;
  time_between_claim: number;
  max_time_claim: number;
  passive_coin_per_min: number;
  coin_per_object: number;
  rank_per_object: number;
  total_ref_count: number;
  total_ref_coin: number;
  last_claim: Date;
  daily_play_time: number;
  last_checkin?: Date;
  total_checkin: number;
  wallet_address?: string;
  item_per_object: number;
  config_checkin?: ConfigCheckin[];
  rank_index: number;
} & UserPublic;

export type ClaimSubmit = {
  pointClaimed: number;
  updateTime: number;
};

export type Event = {
  _id: string;
  title: string;
  description: string;
  event_url?: string;
  thumbnail: string;
  category?: string[];
  country?: CountryType;
  conference?: string;
  fromDateTime: Date;
  toDateTime: Date;
  status: string;
  created_at: Date;
  updated_at: Date;
};

export type GameConfig = {
  config_type: string;
  created_at: string;
  id: number;
  level: number;
  max_value?: number;
  min_value?: number;
  reward?: number;
  updated_at: string;
  title?: string;
  task_url?: string;
};

export enum CONFIG_LINK_SOCIAL {
  X = 'https://x.com/mydoglibre',
  TELEGRAM = 'https://t.me/DogLibre',
  DISCORD = 'https://discord.gg/HFXKQ5wUKa',
  YOUTUBE = 'https://www.youtube.com/@DogLibre',
  INSTAGRAM = 'https://www.instagram.com/doglibre/',
  REDDIT = 'https://www.reddit.com/r/DogLibre/',
  LINKEDIN = 'https://www.linkedin.com/company/doglibre',
  TIKTOK = 'https://www.tiktok.com/@doglibre',
  FACEBOOK = 'https://www.facebook.com/DogLibre/',
  READ_WHITEPAPER = 'https://doglibre.gitbook.io/doglibre',
  JOIN_PRESALE = 'https://www.doglibre.com/',
}

export enum CONFIG_TYPE {
  LEVEL = 'LEVEL',
  DAILY_REWARDS = 'daily_reward',
  UPGRADE = 'UPGRADE',
  REF_POINTS = 'ref_points',
  LEADER_BOARD = 'leader_board',
  WALLET_CONNECT = 'wallet_connect',
  DAILY_MISSION = 'daily_mission',
}

export enum UPGRADE_TYPE {
  MINING = 'MINE',
  STORAGE = 'TIME',
}

export type TaskUser = {
  status: TaskUserStatus;
  reward_amount: number;
  is_done: boolean;
};

export type MetaData = {
  url?: string;
  name?: string;
  image_url?: string;
  ios_url?: string;
  important?: string;
  group_name?: string;
  group_order?: string;
  subgroup_img?: string;
  subgroup_name?: string;
  subgroup_type?: string;
  is_tma?: boolean;
  query_url?: string;
  lookup_value?: string;
  query_method?: string;
  public_url?: string;
};

export enum POINT_ORDER_BY {
  BALANCES = 'Balances',
  HISTORY = 'History',
}

export const CONFIG_LEADERBOARD_RANKING = [
  {
    backgroundColor: 'bg-gradient-to-b from-[#F1BE97] to-[#8C542E]',
    logo: './imgs/pawsitive-pups.png',
    styleInHomePage:
      'bg-[linear-gradient(91.97deg,#AD6939_3.19%,#D6A888_49.61%,#AD6939_97.92%)] text-border border border-[#764827]',
    styleCurrentRank: {
      styleBtn: '!bg-[#D5AE91]',
      styleBtnBottom: '!bg-[#44403C]',
    },
  },
  {
    backgroundColor: 'bg-gradient-to-b from-[#F1BE97] to-[#8C542E]',
    logo: './imgs/wags-n-woofs.png',
    styleInHomePage:
      'bg-[linear-gradient(91.97deg,#AD6939_3.19%,#D6A888_49.61%,#AD6939_97.92%)] text-border border border-[#764827]',
    styleCurrentRank: {
      styleBtn: '!bg-[#D5AE91]',
      styleBtnBottom: '!bg-[#44403C]',
    },
  },
  {
    backgroundColor: 'bg-gradient-to-b from-[#F1BE97] to-[#8C542E]',
    logo: './imgs/super-sniffers.png',
    styleInHomePage:
      'bg-[linear-gradient(91.97deg,#AD6939_3.19%,#D6A888_49.61%,#AD6939_97.92%)] text-border border border-[#764827]',
    styleCurrentRank: {
      styleBtn: '!bg-[#D5AE91]',
      styleBtnBottom: '!bg-[#44403C]',
    },
  },
  {
    backgroundColor: 'bg-gradient-to-b from-[#95A8AC] to-[#4F5B61]',
    logo: './imgs/busy-barkers.png',
    styleInHomePage:
      'bg-[linear-gradient(92.67deg,#81919B_0.68%,#B6C1C8_51.39%,#81919B_98.2%)] text-border-gray border border-[#5F7480]',
    styleCurrentRank: {
      styleBtn: '!bg-[#B1B9BB]',
      styleBtnBottom: '!bg-[#44403C]',
    },
  },
  {
    backgroundColor: 'bg-gradient-to-b from-[#95A8AC] to-[#4F5B61]',
    logo: './imgs/canine-crusaders.png',
    styleInHomePage:
      'bg-[linear-gradient(92.67deg,#81919B_0.68%,#B6C1C8_51.39%,#81919B_98.2%)] text-border-gray border border-[#5F7480]',
    styleCurrentRank: {
      styleBtn: '!bg-[#B1B9BB]',
      styleBtnBottom: '!bg-[#44403C]',
    },
  },
  {
    backgroundColor: 'bg-gradient-to-b from-[#95A8AC] to-[#4F5B61]',
    logo: './imgs/first-among-fidos.png',
    styleInHomePage:
      'bg-[linear-gradient(92.67deg,#81919B_0.68%,#B6C1C8_51.39%,#81919B_98.2%)] text-border-gray border border-[#5F7480]',
    styleCurrentRank: {
      styleBtn: '!bg-[#B1B9BB]',
      styleBtnBottom: '!bg-[#44403C]',
    },
  },
  {
    backgroundColor: 'bg-gradient-to-b from-[#FBE490] to-[#F09A00]',
    logo: './imgs/alpha-pack.png',
    styleInHomePage:
      'bg-[linear-gradient(93.59deg,#F1A712_0.77%,#F0DD86_48.12%,#F1A712_96.42%)] text-border-yellow border border-[#B57C1C]',
    styleCurrentRank: {
      styleBtn: '!bg-[#F8D685]',
      styleBtnBottom: '!bg-[#44403C]',
    },
  },
  {
    backgroundColor: 'bg-gradient-to-b from-[#FBE490] to-[#F09A00]',
    logo: './imgs/masterful-mutts.png',
    styleInHomePage:
      'bg-[linear-gradient(93.59deg,#F1A712_0.77%,#F0DD86_48.12%,#F1A712_96.42%)] text-border-yellow border border-[#B57C1C]',
    styleCurrentRank: {
      styleBtn: '!bg-[#F8D685]',
      styleBtnBottom: '!bg-[#44403C]',
    },
  },
  {
    backgroundColor: 'bg-gradient-to-b from-[#FBE490] to-[#F09A00]',
    logo: './imgs/top-doggos.png',
    styleInHomePage:
      'bg-[linear-gradient(93.59deg,#F1A712_0.77%,#F0DD86_48.12%,#F1A712_96.42%)] text-border-yellow border border-[#B57C1C]',
    styleCurrentRank: {
      styleBtn: '!bg-[#F8D685]',
      styleBtnBottom: '!bg-[#44403C]',
    },
  },
];

export type EventOptions = {
  category: string[];
  conference: string[];
  country: CountryType[];
};

export type CountryType = {
  country_name: string;
  country_code: string;
};

export type UpgradeItem = {
  config_type: UPGRADE_TYPE;
  description: string;
  _id: string;
  is_buff: boolean;
  max_level: number;
  title: string;
};

export type UserUpgraded = {
  id: string;
  upgrade: string;
  level: number;
};

interface LevelInfo {
  current_level: number;
  next_level: number;
  price: number;
}

export enum EUpgrade {
  COIN_PER_OBJECT = 'coin_per_object',
  ITEM_PER_OBJECT = 'item_per_object',
  PASSIVE_COIN_PER_MIN = 'passive_coin_per_min',
}

export type KeyUpgradeDTO = 'coin_per_object' | 'item_per_object' | 'passive_coin_per_min';

export interface IUpgrade {
  coin_per_object: LevelInfo;
  item_per_object: LevelInfo;
  passive_coin_per_min: LevelInfo;
}

export type LeaderboardRanking = {
  leaderboard_ranking: UserRank[];
  current_user_ranking: UserRank;
};
export type UpgradePayload = {
  upgrade_id: string;
  claimed_point: number;
  update_time: number;
};

export enum TaskUserStatus {
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}

export type UserCheckInInformation = {
  total_checkin_days: number;
  last_checkin_day?: string;
};

export interface NewOrderResponse {
  items: OrderItem[];
  object_tier: number;
  total: number;
}

export interface OrderItem {
  object_id: number;
  total: number;
}

export interface ComPleteOrderParams {
  object_tier: number;
  total: number;
  total_slided: number;
}
export interface CompleteOrderResponse {
  telegram_id: number;
  total_coin: number;
  current_coin: number;
  volunteer_rank: number;
  total_coin_plus: number;
  total_rank_plus: number;
}
