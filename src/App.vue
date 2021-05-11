<template>
	<open-image v-if="!state.source" />
	<cropper v-else />
</template>

<script lang="ts" setup>
import { state } from '@/hooks/use-cropper'
</script>
