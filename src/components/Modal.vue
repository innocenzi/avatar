<template>
	<TransitionRoot appear as="template" :show="show">
		<Dialog
			class="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
			:open="show"
			@close="$emit('close')"
		>
			<TransitionChild
				as="template"
				enter="transition ease-out duration-300"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="transition ease-in duration-200"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<DialogOverlay class="fixed inset-0 bg-gray-900 opacity-95" />
			</TransitionChild>

			<TransitionChild
				as="template"
				enter="transition ease-out transform duration-300 delay-100"
				enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				enter-to="opacity-100 translate-y-0 sm:scale-100"
				leave="transition ease-in transform duration-200"
				leave-from="opacity-100 translate-y-0 sm:scale-100"
				leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			>
				<div class="relative z-10 text-gray-100 w-full pointer-events-none flex justify-center p-8">
					<slot />
				</div>
			</TransitionChild>
		</Dialog>
	</TransitionRoot>
</template>

<script setup lang="ts">
import { defineEmit, defineProps } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from '@headlessui/vue'

defineEmit(['close'])
defineProps({ show: Boolean })
</script>
