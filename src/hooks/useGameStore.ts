import { GAME_CONFIGS } from '@/constants';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface GameState {
  balance: number;
  setBalance: (value: number) => void;
  increaseBalance: (value: number) => void;
  storageHour: number;
  setStorageHour: (value: number) => void;
  miningPerHour: number;
  setMiningPerHour: (value: number) => void;
  unClaimedMining: number | null;
  increaseUnClaimedMining: (value: number) => void;
  resetUnClaimedMining: () => void;
  claimMining: () => void;
}

const useGameStore = createWithEqualityFn<GameState>()(
  (set, get) => ({
    balance: 0,
    setBalance: (value) => set({ balance: value }),
    increaseBalance: (value) => {
      const newBalance = get().balance + value;
      set({ balance: newBalance >= 0 ? newBalance : 0 });
    },
    storageHour: GAME_CONFIGS.STORAGE_HOUR,
    setStorageHour: (value) => set({ storageHour: value }),
    miningPerHour: GAME_CONFIGS.MINING_PER_HOUR,
    setMiningPerHour: (value) => set({ miningPerHour: value }),
    unClaimedMining: null,
    increaseUnClaimedMining: (value) => {
      const unClaimedMining = get().unClaimedMining;
      if (unClaimedMining === null) return;

      const maxMining = get().storageHour * get().miningPerHour;
      const newMining = unClaimedMining + value;

      set({ unClaimedMining: maxMining >= newMining ? newMining : maxMining });
    },
    resetUnClaimedMining: () => {
      set({ unClaimedMining: 0 });
    },
    claimMining: () => {
      const { unClaimedMining, balance } = get();
      if (!unClaimedMining) return;

      set({ balance: balance + +unClaimedMining, unClaimedMining: 0 });
    },
  }),
  shallow,
);

export default useGameStore;
