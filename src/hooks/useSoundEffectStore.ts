import { create } from 'zustand';
import { SFX } from '@/constants';

// Define the Zustand store
interface SoundState {
  isBgmOn: boolean;
  isSfxOn: boolean;
  slicing1: HTMLAudioElement;
  slicing2: HTMLAudioElement;
  slicing3: HTMLAudioElement;
  swipe1: HTMLAudioElement;
  swipe2: HTMLAudioElement;
  swipe3: HTMLAudioElement;
  swipe4: HTMLAudioElement;
  dogInteraction: HTMLAudioElement;
  insufficientItemsSound: HTMLAudioElement;
  receivingDogCoinsOrRankingPoints: HTMLAudioElement;
  doglDashMusic: HTMLAudioElement;
  doglDashMusic2: HTMLAudioElement;
  dashMusicGhibliStile: HTMLAudioElement;
  lossSoundDash: HTMLAudioElement;
  winSoundDash: HTMLAudioElement;
  earnButton: HTMLAudioElement;
  frensButton: HTMLAudioElement;
  homeButton: HTMLAudioElement;
  playGameButton: HTMLAudioElement;
  settingButton: HTMLAudioElement;
  upgrade: HTMLAudioElement;
  rankingButton: HTMLAudioElement;
  walletButton: HTMLAudioElement;
  sparksOutro: HTMLAudioElement;
  toggleBgm: () => void;
  toggleSfx: () => void;
}

// Helper functions to get and set localStorage values
const getLocalStorage = (key: string, defaultValue: boolean) => {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
};

const setLocalStorage = (key: string, value: boolean) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const useSoundEffectStore = create<SoundState>((set) => ({
  isBgmOn: getLocalStorage('isBgmOn', true),
  isSfxOn: getLocalStorage('isSfxOn', true),
  slicing1: new Audio(SFX.SLICING_1),
  slicing2: new Audio(SFX.SLICING_2),
  slicing3: new Audio(SFX.SLICING_3),
  swipe1: new Audio(SFX.SWIPE_1),
  swipe2: new Audio(SFX.SWIPE_2),
  swipe3: new Audio(SFX.SWIPE_3),
  swipe4: new Audio(SFX.SWIPE_4),
  dogInteraction: new Audio(SFX.DOG_INTERACTION),
  insufficientItemsSound: new Audio(SFX.INSUFFICIENT_ITEMS_SOUND),
  receivingDogCoinsOrRankingPoints: new Audio(SFX.RECEIVEING_DOG_COINS_OR_RANKING_POINTS),
  doglDashMusic: new Audio(SFX.DOGL_DASH_MUSIC),
  doglDashMusic2: new Audio(SFX.DOGL_DASH_MUSIC_2),
  dashMusicGhibliStile: new Audio(SFX.DASH_MUSIC_GHIBLI_STILE),
  lossSoundDash: new Audio(SFX.LOSS_SOUND_DASH),
  winSoundDash: new Audio(SFX.WIN_SOUND_DASH),
  earnButton: new Audio(SFX.EARN_BUTTON),
  frensButton: new Audio(SFX.FRENS_BUTTON),
  homeButton: new Audio(SFX.HOME_BUTTON),
  playGameButton: new Audio(SFX.PLAY_GAME_BUTTON),
  settingButton: new Audio(SFX.SETTING_BUTTON),
  upgrade: new Audio(SFX.UPGRADE),
  rankingButton: new Audio(SFX.RANKING_BUTTON),
  walletButton: new Audio(SFX.WALLET_BUTTON),
  sparksOutro: new Audio(SFX.SPARKS_OUTRO),

  toggleBgm: () =>
    set((state) => {
      const newValue = !state.isBgmOn;
      setLocalStorage('isBgmOn', newValue);
      return { isBgmOn: newValue };
    }),

  toggleSfx: () =>
    set((state) => {
      const newValue = !state.isSfxOn;
      setLocalStorage('isSfxOn', newValue);
      return { isSfxOn: newValue };
    }),
}));

export default useSoundEffectStore;
