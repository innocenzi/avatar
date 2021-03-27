<template>
	<open-image v-if="!originalImage" />
	<cropper />
</template>

<script lang="ts" setup>
import { originalImage } from './components/hooks/useCropper';
</script>
