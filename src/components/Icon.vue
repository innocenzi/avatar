<template>
	<svg aria-hidden="true">
		<use :xlink:href="symbolId" :fill="color" />
	</svg>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		default: 'currentColor',
	},
})

const symbolId = computed(() => `#${props.name}`)
</script>
