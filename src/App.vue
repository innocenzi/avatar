<template>
	<image-form />
	<cropper />
</template>

<script setup lang="ts">
import { registerShortcuts } from '@/hooks/use-shortcuts'

registerShortcuts()
</script>
