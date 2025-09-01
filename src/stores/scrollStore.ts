import { defineStore } from 'pinia';
import { type ScrollDetails } from 'src/types/Scroll';

export const useScrollStore = defineStore('scroll', {
  state: () => ({
    scrollInfo: null as ScrollDetails | null,
  }),
  actions: {
    setScrollInfo(info: ScrollDetails) {
      this.scrollInfo = { ...info };
    },
  },
});