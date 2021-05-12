<template>
	<aside class="flex flex-wrap items-center justify-center max-w-lg px-8 py-5 bg-gray-800 rounded-md shadow-xl ring-2 ring-gray-600 gap-7 lg:max-w-3xl">
		<!-- Rotation -->
		<tool-group name="Rotation">
			<tool-button class="transform active:-rotate-6" title="Rotate counter-clockwise" @click="rotate(-90)">
				<mdi:rotate-left class="w-5 h-5" />
			</tool-button>
			<tool-button class="transform active:rotate-6" title="Rotate clockwise" @click="rotate(90)">
				<mdi:rotate-right class="w-5 h-5" />
			</tool-button>
		</tool-group>

		<!-- Flip -->
		<tool-group name="Flip">
			<tool-button class="transform active:scale-x-flip" title="Flip horizontally" @click="flip('horizontal')">
				<mdi:flip-horizontal class="w-5 h-5" />
			</tool-button>
			<tool-button class="transform active:scale-y-flip" title="Flip vertically" @click="flip('vertical')">
				<mdi:flip-vertical class="w-5 h-5" />
			</tool-button>
		</tool-group>

		<!-- Zoom -->
		<tool-group name="Zoom">
			<tool-button class="transform active:scale-90" title="Zoom in" @click="zoom('in')">
				<mdi:magnify-plus-outline class="w-5 h-5" />
			</tool-button>
			<tool-button class="transform active:scale-90" title="Zoom out" @click="zoom('out')">
				<mdi:magnify-minus-outline class="w-5 h-5" />
			</tool-button>
		</tool-group>

		<!-- Transform -->
		<tool-group name="Transform">
			<tool-button class="transform active:scale-90" title="Maximize" @click="transform('maximize')">
				<mdi:fullscreen class="w-5 h-5" />
			</tool-button>
			<tool-button class="transform active:scale-90" title="Center" @click="transform('center')">
				<mdi:fullscreen-exit class="w-5 h-5" />
			</tool-button>
		</tool-group>

		<!-- Separator -->
		<div />

		<!-- Actions -->
		<tool-group class="justify-center" wrapper="gap-2">
			<action-button title="Open another image" @click="state.inputDialog = true">
				<mdi:folder-open-outline class="w-5 h-5" />
			</action-button>
			<action-button title="Download the cropped image" @click="download">
				<span>Download</span>
				<mdi:download-outline class="w-5 h-5" />
			</action-button>
		</tool-group>
	</aside>
</template>

<script setup lang="ts">
import { state, rotate, flip, zoom, transform, download } from '@/hooks/use-cropper'
</script>
