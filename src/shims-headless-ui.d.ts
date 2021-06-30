import { Popover } from '@headlessui/vue'

declare module 'vue' {
	export interface GlobalComponents {
		Popover: typeof Popover & {
			__VLS_slots: {
				default: { open: boolean }
			}
		}
	}
}

export {}
