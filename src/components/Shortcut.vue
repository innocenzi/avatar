<template>
	<div class="flex space-x-1">
		<div
			v-for="part in parts"
			:key="part"
			class="rounded-md bg-gray-700 px-2 py-1 text-xs capitalize font-medium text-gray-200"
			v-text="name(part)"
		/>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue-demi'

const { keybindings } = defineProps<{
	keybindings: string
}>()

const parts = keybindings.split('+')
const name = (key: string) => {
	const map: Record<string, string> = {
		ArrowLeft: '←',
		ArrowRight: '→',
		ArrowUp: '↑',
		ArrowDown: '↓',
		Minus: '-',
		Plus: '+',
	}

	return map[key] ?? key
}
</script>
