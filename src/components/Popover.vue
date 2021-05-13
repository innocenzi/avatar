<template>
	<popover v-slot="{ open }">
		<popover-button
			:class="[
				'px-3 py-2.5 space-x-1 flex items-center justify-center',
				'text-sm font-medium',
				'transition',
				'rounded-md',
				'text-gray-300 bg-gray-300 bg-opacity-15 hover:bg-opacity-20',
				'focus:outline-none focus-visible:bg-opacity-20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-gray-200 focus-visible:ring-opacity-20'
			]"
		>
			<slot :open="open" name="button" />
		</popover-button>

		<transition-root
			:show="open"
			class="relative z-10"
			enter="transition-opacity duration-300"
			enter-from="opacity-0"
			enter-to="opacity-100"
			leave="transition-opacity duration-150"
			leave-from="opacity-100"
			leave-to="opacity-0"
		>
			<popover-overlay
				class="bg-black z-11 inset-0 fixed opacity-70"
			/>
		</transition-root>

		<transition
			enter-active-class="transition transform origin-top-left duration-200 ease-out"
			enter-from-class="scale-90 opacity-0"
			enter-to-class="scale-100 opacity-100"
			leave-active-class="transition transform origin-top-left duration-150 ease-in"
			leave-from-class="scale-100 opacity-100"
			leave-to-class="scale-90 opacity-0"
		>
			<popover-panel class="z-20 absolute mt-8 p-6 flex flex-col rounded-lg bg-gray-800 border border-gray-700">
				<slot />
			</popover-panel>
		</transition>
	</popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel, PopoverOverlay, TransitionRoot } from '@headlessui/vue'
</script>
