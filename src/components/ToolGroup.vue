<template>
	<div class="flex flex-col">
		<span class="text-sm font-medium text-gray-500 mb-1" v-text="name" />
		<div class="flex space-x-1">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
	name: string
}>()
</script>
