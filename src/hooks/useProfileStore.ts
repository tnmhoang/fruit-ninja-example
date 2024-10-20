import useGameStore from '@/hooks/useGameStore';
import { User } from '@/types';
import dayjs from 'dayjs';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface ProfileState {
  profile: User | undefined;
  setProfile: (value: User | undefined) => void;
  token: string | undefined;
  setToken: (value: string | undefined) => void;
}

const useProfileStore = createWithEqualityFn<ProfileState>()(
  (set) => ({
    profile: undefined,
    setProfile: (value) => {
      set({ profile: value });
      if (!value) return;

      const { max_time_claim, passive_coin_per_min, current_coin, last_claim } = value;

      let unClaimedMining = null;

      if (last_claim === null) {
        const updatedInHours = dayjs(new Date()).diff(new Date(0), 'seconds') / 60;
        const maxClaim = max_time_claim * passive_coin_per_min;
        const maxEnergyAfterSync =
          (updatedInHours >= 0 ? updatedInHours : 0) * passive_coin_per_min;
        unClaimedMining = maxEnergyAfterSync < maxClaim ? maxEnergyAfterSync : maxClaim;
      }

      if (last_claim) {
        const updatedInHours = dayjs(new Date()).diff(new Date(last_claim), 'seconds') / 60;
        const maxClaim = max_time_claim * passive_coin_per_min;
        const maxEnergyAfterSync =
          (updatedInHours >= 0 ? updatedInHours : 0) * passive_coin_per_min;
        unClaimedMining = maxEnergyAfterSync < maxClaim ? maxEnergyAfterSync : maxClaim;
      }

      useGameStore.setState({
        balance: current_coin,
        storageHour: max_time_claim,
        miningPerHour: passive_coin_per_min,
        unClaimedMining,
      });
    },

    token: undefined,
    setToken: (value) => set({ token: value }),
  }),
  shallow,
);

export default useProfileStore;
