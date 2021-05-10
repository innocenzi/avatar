<template>
	<aside class="w-full shadow-xl bg-gray-800 rounded-md ring-2 ring-gray-600 max-w-lg lg:max-w-3xl p-6 flex space-x-6">
		<tool-group name="Rotation">
			<tool-button @click="rotate(-90)" class="active:-rotate-6 transform" title="Rotate counter-clockwise">
				<mdi:rotate-left class="w-5 h-5" />
			</tool-button>
			<tool-button @click="rotate(90)" class="active:rotate-6 transform" title="Rotate clockwise">
				<mdi:rotate-right class="w-5 h-5" />
			</tool-button>
		</tool-group>
		<tool-group name="Flip">
			<tool-button @click="flip('horizontal')" class="active:scale-x-flip transform" title="Flip horizontally">
				<mdi:flip-horizontal class="w-5 h-5" />
			</tool-button>
			<tool-button @click="flip('vertical')" class="active:scale-y-flip transform" title="Flip vertically">
				<mdi:flip-vertical class="w-5 h-5" />
			</tool-button>
		</tool-group>
		<tool-group name="Zoom">
			<tool-button @click="zoom('in')" class="active:scale-95 transform" title="Zoom in">
				<heroicons-outline:zoom-in class="w-5 h-5" />
			</tool-button>
			<tool-button @click="zoom('out')" class="active:scale-95 transform" title="Zoom out">
				<heroicons-outline:zoom-out class="w-5 h-5" />
			</tool-button>
		</tool-group>
	</aside>
</template>

<script setup lang="ts">
import { rotate, flip, zoom } from '@/hooks/use-cropper'
</script>
