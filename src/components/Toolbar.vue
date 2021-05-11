<template>
	<aside class="shadow-xl bg-gray-800 rounded-md ring-2 ring-gray-600 max-w-lg lg:max-w-3xl p-6 flex space-x-6">
		<tool-group name="Rotation">
			<tool-button class="active:-rotate-6 transform" title="Rotate counter-clockwise" @click="rotate(-90)">
				<mdi:rotate-left class="w-5 h-5" />
			</tool-button>
			<tool-button class="active:rotate-6 transform" title="Rotate clockwise" @click="rotate(90)">
				<mdi:rotate-right class="w-5 h-5" />
			</tool-button>
		</tool-group>
		<tool-group name="Flip">
			<tool-button class="active:scale-x-flip transform" title="Flip horizontally" @click="flip('horizontal')">
				<mdi:flip-horizontal class="w-5 h-5" />
			</tool-button>
			<tool-button class="active:scale-y-flip transform" title="Flip vertically" @click="flip('vertical')">
				<mdi:flip-vertical class="w-5 h-5" />
			</tool-button>
		</tool-group>
		<tool-group name="Zoom">
			<tool-button class="active:scale-90 transform" title="Zoom in" @click="zoom('in')">
				<heroicons-outline:zoom-in class="w-5 h-5" />
			</tool-button>
			<tool-button class="active:scale-90 transform" title="Zoom out" @click="zoom('out')">
				<heroicons-outline:zoom-out class="w-5 h-5" />
			</tool-button>
		</tool-group>
		<tool-group class="justify-center">
			<preview
				v-if="state.crop"
				:width="32"
				:height="32"
				:image="state.crop.image"
				:coordinates="state.crop.coordinates"
				class="rounded-full ml-4"
			/>
		</tool-group>
		<tool-group class="justify-center">
			<action-button @click="download">
				<span>Export</span>
				<mdi:export-variant class="w-5 h-5" />
			</action-button>
		</tool-group>
	</aside>
</template>

<script setup lang="ts">
import { state, rotate, flip, zoom, download } from '@/hooks/use-cropper'
import { Preview } from 'vue-advanced-cropper'
</script>
