<template>
	<popover>
		<template #button="{ open }">
			<icon name="uil:keyboard" class="w-5 h-5 mr-2" />
			<span class="font-medium" v-text="open ? 'Esc' : 'Shortcuts'" />
		</template>

		<template #default>
			<span class="mb-4 text-lg font-bold">Shortcuts</span>
			<div class="flex flex-col space-y-6">
				<div v-for="(group, i) in toolbar" :key="`${group.name}-${i}`" class="flex flex-col space-y-2">
					<button
						v-for="tool in unique(group.actions)"
						:key="`${tool.keybinding}-${i}`"
						class="flex items-center justify-between text-white rounded text-opacity-40 focus-visible:ring focus-visible:ring-offset-3 focus-visible:ring-offset-gray-800 focus-visible:ring-pink-300 focus-visible:ring-opacity-100 focus:outline-none focus-visible:text-pink-300"
						@click="() => tool.action?.()"
					>
						<span class="mr-20 text-sm" v-text="tool.description" />
						<shortcut :keybindings="tool.keybinding" />
					</button>
				</div>
			</div>
		</template>
	</popover>
</template>

<script setup lang="ts">
import { toolbar } from '@/hooks/use-tools'
import type { Tool } from '@/hooks/use-tools'

function unique(tools: Tool[]) {
	return tools.filter((value, index, self) => self.findIndex((candidate) => value.icon === candidate.icon) === index)
}
</script>
