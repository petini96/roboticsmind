import { defineStore } from 'pinia'
import type { LayoutConfig } from '../types/LayoutConfig'

export const useLayoutConfigStore = defineStore('layoutConfig', {
    state: () => {
        return {
            layoutConfig: {} as LayoutConfig | null
        }
    },
    actions: {
        setIsSleeping(value: boolean) {
            if (this.layoutConfig) {
                this.layoutConfig.isSleeping = value;
            }
        },
    },
})

