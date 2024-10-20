export const WEB_APP_LINK = import.meta.env.VITE_WEB_APP_LINK;
export const APP_URLS = {
  HOME: '/',
  UPGRADE: '/upgrade',
  BOOSTERS: '/booster',
  DISCOVER_PAGE: '/discover',
  EVENT_DETAIL_PAGE: (slug: string | number) => `/event/${slug}`,
  FRIEND_PAGE: '/friends',
  MISSION_PAGE: '/missions',
  LEADERBOARD_PAGE: '/leaderboard',
  EARN: '/earn',
  ME: '/me',
  WALLET: '/wallet',
  PLAY_GAME: '/play',
  ABOUT: '/about',
};

export const QUERY_KEYS = {
  PROFILE: 'PROFILE',
  FRIENDS: 'FRIENDS',
  LEADERBOARD: 'LEADERBOARD',
  LEADERBOARD_ME: 'LEADERBOARD_ME',
  MISSION_DAILY: 'MISSION_DAILY',
  GAME_CONFIGS: 'GAME_CONFIGS',
  EVENT: 'EVENT',
  EVENT_FEATURED: 'EVENT_FEATURED',
  EVENT_OPTIONS: 'EVENT_OPTIONS',
  TASK_SOCIAL: 'TASK_SOCIAL',
  UPGRADED_ITEMS: 'UPGRADED_ITEMS',
  USER_UPGRADED: 'USER_UPGRADED',
};

export const SFX = {
  SLICING_1: '/sfx/game_sounds/Slicing/Slicing 1.wav',
  SLICING_2: '/sfx/game_sounds/Slicing/Slicing 2.wav',
  SLICING_3: '/sfx/game_sounds/Slicing/Slicing 3.wav',
  DOG_INTERACTION: '/sfx/game_sounds/Swipe/Dog Interaction.wav',
  SWIPE_1: '/sfx/game_sounds/Swipe/Swipe 1.wav',
  SWIPE_2: '/sfx/game_sounds/Swipe/Swipe 2.wav',
  SWIPE_3: '/sfx/game_sounds/Swipe/Swipe 3.wav',
  SWIPE_4: '/sfx/game_sounds/Swipe/Swipe 4.wav',
  INSUFFICIENT_ITEMS_SOUND: '/sfx/game_sounds/Swipe/Insufficient items sound.wav',
  RECEIVEING_DOG_COINS_OR_RANKING_POINTS:
    '/sfx/game_sounds/Swipe/Receiving Dog Coins or Ranking Points.wav',
  DOGL_DASH_MUSIC: '/sfx/music/DOGL Dash Music.wav',
  DOGL_DASH_MUSIC_2: '/sfx/music/DOGL Dash Music V2.wav',
  DASH_MUSIC_GHIBLI_STILE: '/sfx/music/Dash Music Ghibli Stile.wav',
  LOSS_SOUND_DASH: '/sfx/result_sounds/Loss Sound Dash.wav',
  WIN_SOUND_DASH: '/sfx/result_sounds/Win Sound Dash.wav',
  EARN_BUTTON: '/sfx/UI_sounds/Earn Button.wav',
  FRENS_BUTTON: '/sfx/UI_sounds/Frens Button.wav',
  HOME_BUTTON: '/sfx/UI_sounds/Home Button.wav',
  PLAY_GAME_BUTTON: '/sfx/UI_sounds/Play Game Button.wav',
  SETTING_BUTTON: '/sfx/UI_sounds/Setting Button.wav',
  UPGRADE: '/sfx/UI_sounds/Upgrade.wav',
  RANKING_BUTTON: '/sfx/UI_sounds/Ranking Button.wav',
  WALLET_BUTTON: '/sfx/UI_sounds/Wallet Button.wav',
  SPARKS_OUTRO: '/sfx/sparks_outro/DogLibre Audio Logo V2.wav',
};

export enum SFX_KEYS {
  SLICING_1 = 'SLICING_1',
  SLICING_2 = 'SLICING_2',
  SLICING_3 = 'SLICING_3',
  SWIPE_1 = 'SWIPE_1',
  SWIPE_2 = 'SWIPE_2',
  SWIPE_3 = 'SWIPE_3',
  SWIPE_4 = 'SWIPE_4',
  DOG_INTERACTION = 'DOG_INTERACTION',
  INSUFFICIENT_ITEMS_SOUND = 'INSUFFICIENT_ITEMS_SOUND',
  RECEIVEING_DOG_COINS_OR_RANKING_POINTS = 'RECEIVEING_DOG_COINS_OR_RANKING_POINTS',
  LOSS = 'Loss',
  WIN = 'Win',
  EARN = 'Earn',
  FRENS = 'Frens',
  HOME = 'Home',
  PLAY = 'Play',
  SETTING = 'Setting',
  UPGRADE = 'Upgrade',
  RANKING = 'Ranking',
  WALLET = 'Wallet',
  SPARKS_OUTRO = 'SPARKS_OUTRO',
  NULL = 'NULL',
}

export const TELEGRAM_DATA = import.meta.env.VITE_TELEGRAM_DATA;
export const IS_DEV_MODE = import.meta.env.DEV;

export const GAME_CONFIGS = {
  MIN_CLAIM_TIME_IN_MINUTES: 6,
  MINING_PER_HOUR: 60 * 60,
  STORAGE_HOUR: 1 / 60,
  DAYS_PER_LOOP: 7,
};
