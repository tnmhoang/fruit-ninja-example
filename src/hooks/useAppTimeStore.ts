import { createWithEqualityFn } from 'zustand/traditional';

const useAppTimeStore = createWithEqualityFn<{
  now: Date;
  timer?: NodeJS.Timeout;
  startTicking: () => NodeJS.Timeout;
}>((set, get) => ({
  now: new Date(),
  timer: undefined,
  startTicking() {
    clearInterval(get().timer);

    const timer = setInterval(() => {
      set({
        now: new Date(),
      });
    }, 1000);
    set({
      timer,
    });

    return timer;
  },
}));

export default useAppTimeStore;
