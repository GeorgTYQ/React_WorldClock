import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useClockStore = create(
  immer((set, get) => ({
    clocks: {},

    updateClock: (city, timezone, timeData) =>
      set((state) => {
        state.clocks[city] = {
          timezone,
          ...timeData,
        };
      }),

    setClockLight: (city, isLight) =>
      set((state) => {
        if (state.clocks[city]) {
          state.clocks[city].light = isLight;
        }
      }),

    // 添加搜索时区功能
    searchCity: (city) => {
      // 这个函数将在实现API调用后添加更多逻辑
      return get().clocks[city] || null;
    }
  }))
);

export default useClockStore;
