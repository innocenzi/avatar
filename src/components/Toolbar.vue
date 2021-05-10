<template>
	<aside class="w-full shadow-xl bg-gray-800 rounded-md ring-2 ring-gray-600 max-w-lg lg:max-w-3xl p-6">
		<tool-group name="Rotation">
			<tool-button @click="rotate('clockwise')" class="active:rotate-6 transform">
				<carbon-rotate-180 />
			</tool-button>
			<tool-button @click="rotate('clockwise')" class="active:-rotate-6 transform">
				<carbon-rotate />
			</tool-button>
		</tool-group>
	</aside>
</template>

<script setup lang="ts">
function rotate(direction: 'clockwise' | 'counter-clockwise') {
	console.log(direction);
}
</script>
