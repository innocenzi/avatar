<template>
	<image-form />
	<cropper />
</template>

<script setup lang="ts">
import { useShortcuts } from '@/hooks/use-tools'
import { tryOnUnmounted } from '@vueuse/shared'

tryOnUnmounted(useShortcuts())
</script>
