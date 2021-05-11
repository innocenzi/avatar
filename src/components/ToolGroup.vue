<template>
	<div class="flex flex-col">
		<span v-if="name" class="text-sm font-bold text-gray-500 mb-1" v-text="name" />
		<div class="flex items-center justify-center -ml-1">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
	name?: string
}>()
</script>
