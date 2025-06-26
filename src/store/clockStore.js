import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useClockStore = create(
  immer((set, get) => {
    clocks: {
    }

    updateClock: (city, timezone, timeData) =>
      set((state) => {
        state.clocks[city] = {
          timezone,
          ...timeData,
        };
      });

    setClockLight: (city, isLight) =>
      set((state) => {
        if (state.clocks[city]) {
          state.clocks[city].light = isLight;
        }
      });
  })
);

export default useClockStore;
