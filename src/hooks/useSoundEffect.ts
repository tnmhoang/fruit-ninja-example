import { SFX_KEYS } from '@/constants';
import { useCallback, useRef } from 'react';
import useSoundEffectStore from './useSoundEffectStore';

const useSoundEffect = () => {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
    isBgmOn,
    isSfxOn,
    slicing1,
    slicing2,
    slicing3,
    swipe1,
    swipe2,
    swipe3,
    swipe4,
    dogInteraction,
    insufficientItemsSound,
    receivingDogCoinsOrRankingPoints,
    lossSoundDash,
    doglDashMusic,
    doglDashMusic2,
    dashMusicGhibliStile,
    winSoundDash,
    earnButton,
    frensButton,
    homeButton,
    playGameButton,
    settingButton,
    upgrade,
    rankingButton,
    walletButton,
    sparksOutro,
  } = useSoundEffectStore();

  const playBgm = useCallback(() => {
    if (isBgmOn) {
      // Stop any currently playing BGM
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }

      const selectedAudio = Math.random() < 0.5 ? doglDashMusic : doglDashMusic2;
      bgmRef.current = selectedAudio;
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.3;
      bgmRef.current.play().catch((err) => {
        // Fallback: Prompt user interaction to play audio
        document.addEventListener(
          'click',
          () => {
            bgmRef.current?.play().catch((err) => console.log('BGM', err));
          },
          { once: true },
        );
      });
    }
  }, [isBgmOn, doglDashMusic, doglDashMusic2]);

  const stopBgm = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
      bgmRef.current = null; // Clear the reference to ensure no BGM is playing
    }
  }, []);

  const playSfx = (key: SFX_KEYS) => {
    if (isSfxOn) {
      switch (key) {
        case SFX_KEYS.SLICING_1:
          audioRef.current = slicing1;
          break;
        case SFX_KEYS.SLICING_2:
          audioRef.current = slicing2;
          break;
        case SFX_KEYS.SLICING_3:
          audioRef.current = slicing3;
          break;
        case SFX_KEYS.SWIPE_1:
          audioRef.current = swipe1;
          break;
        case SFX_KEYS.SWIPE_2:
          audioRef.current = swipe2;
          break;
        case SFX_KEYS.SWIPE_3:
          audioRef.current = swipe3;
          break;
        case SFX_KEYS.SWIPE_4:
          audioRef.current = swipe4;
          break;
        case SFX_KEYS.DOG_INTERACTION:
          audioRef.current = dogInteraction;
          break;
        case SFX_KEYS.INSUFFICIENT_ITEMS_SOUND:
          audioRef.current = insufficientItemsSound;
          break;
        case SFX_KEYS.RECEIVEING_DOG_COINS_OR_RANKING_POINTS:
          audioRef.current = receivingDogCoinsOrRankingPoints;
          break;
        case SFX_KEYS.LOSS:
          audioRef.current = lossSoundDash;
          break;
        case SFX_KEYS.WIN:
          audioRef.current = winSoundDash;
          break;
        case SFX_KEYS.EARN:
          audioRef.current = earnButton;
          break;
        case SFX_KEYS.FRENS:
          audioRef.current = frensButton;
          break;
        case SFX_KEYS.HOME:
          audioRef.current = homeButton;
          break;
        case SFX_KEYS.PLAY:
          audioRef.current = playGameButton;
          break;
        case SFX_KEYS.SETTING:
          audioRef.current = settingButton;
          break;
        case SFX_KEYS.UPGRADE:
          audioRef.current = upgrade;
          break;
        case SFX_KEYS.RANKING:
          audioRef.current = rankingButton;
          break;
        case SFX_KEYS.WALLET:
          audioRef.current = walletButton;
          break;
        case SFX_KEYS.SPARKS_OUTRO:
          audioRef.current = sparksOutro;
          break;
        default:
          return SFX_KEYS.NULL;
      }
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log('audio', err);
        });
      }
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const pauseAudio = () => {
    if (bgmRef.current && isBgmOn) {
      bgmRef.current.pause();
    }
  };

  const resumeAudio = () => {
    if (bgmRef.current && isBgmOn) {
      bgmRef.current.play();
    }
  };

  return { playBgm, stopBgm, playSfx, stop, pauseAudio, resumeAudio };
};

export default useSoundEffect;
