<template>
	<aside class="flex flex-wrap items-center justify-center max-w-lg px-8 py-5 bg-gray-800 rounded-md shadow-xl ring-2 ring-gray-600 gap-7 lg:max-w-3xl">
		<tool-group v-for="(group, i) in toolbar" :key="`${group.name}${i}`" :name="group.name" :keep="!group.name">
			<template v-for="(tool, y) in unique(group.actions)" :key="`${tool.description}${y}`">
				<!-- Primary actions -->
				<action-button v-if="tool.primary !== undefined" :title="description(tool)" class="ml-2" @click="tool.action">
					<span v-text="tool.primary" />
					<icon :name="tool.icon" class="w-5 h-5" />
				</action-button>

				<!-- Normal actions -->
				<tool-button v-else :title="description(tool)" @click="tool.action">
					<icon :name="tool.icon" class="w-5 h-5" />
				</tool-button>
			</template>
		</tool-group>
	</aside>
</template>

<script setup lang="ts">
import { toolbar } from '@/hooks/use-tools'
import type { Tool } from '@/hooks/use-tools'

function unique(tools: Tool[]) {
	return tools.filter((value, index, self) => self.findIndex((candidate) => value.icon === candidate.icon) === index)
}

function description(tool: Tool) {
	return `${tool.description} (${tool.keybinding})`
}
</script>
