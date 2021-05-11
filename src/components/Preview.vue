<template>
	<div class="relative">
		<cropper-preview
			v-if="state.crop"
			:width="width"
			:height="height"
			:image="state.crop.image"
			:coordinates="state.crop.coordinates"
			class="rounded-full"
		/>

		<div
			v-if="width <= 40 && height <= 40"
			class="absolute w-2.5 h-2.5 rounded-full bottom-0 right-0 ring ring-gray-900"
			:class="{
				'bg-yellow-400': status === 'away',
				'bg-red-400': status === 'busy',
				'bg-gray-400': status === 'offline',
				'bg-green-400': status === 'online',
			}"
		/>
	</div>
</template>

<script setup lang="ts">
import { state } from '@/hooks/use-cropper'
import { Preview as CropperPreview } from 'vue-advanced-cropper'
import { defineProps } from 'vue'

defineProps<{
	width: number
	height: number
	status?: 'busy' | 'away' | 'online' | 'offline'
}>()
</script>
