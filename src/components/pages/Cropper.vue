<template>
	<section>

		<div class="block w-128 h-128">
			<img id="image" :src="originalImage" class="block max-w-full">
		</div>
	</section>
</template>

<script setup lang="ts">
import { onMounted, ref, unref, watch } from 'vue'
import { originalImage } from "../hooks/useCropper"
import Cropper from 'cropperjs'
// use this insteqd
// https://norserium.github.io/vue-advanced-cropper/
onMounted(() => {
	const cropper = new Cropper(document.getElementById('image') as HTMLImageElement, {
		viewMode: 1,
		ready() {
			console.log('ready')
		},
		crop(event) {
			console.log(event.detail.x);
			console.log(event.detail.y);
			console.log(event.detail.width);
			console.log(event.detail.height);
			console.log(event.detail.rotate);
			console.log(event.detail.scaleX);
			console.log(event.detail.scaleY);
		},
	})

	watch(originalImage, image => {
		if (!image?.length) {
			return
		}

		cropper.replace(image)
	})
})
</script>
