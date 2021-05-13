<template>
	<section class="flex flex-col items-center h-full">
		<cropper />

		<section class="flex flex-col items-center flex-shrink-0 w-full px-6">
			<toolbar />
			<footer class="flex text-center items-center justify-center p-8 space-x-8 text-xs text-gray-500">
				<footer-link href="https://github.com/innocenzi/avatar">
					GitHub
				</footer-link>
				<span>
					<span class="hidden sm:inline">Made with <span class="text-[0.7rem]">❤</span>&nbsp;</span>
					<span>by&nbsp;</span>
					<footer-link class="font-bold" href="https://twitter.com/enzoinnocenzi">Enzo Innocenzi</footer-link>
				</span>
				<footer-link href="https://github.com/innocenzi/avatar/issues">
					Feedback
				</footer-link>
			</footer>
		</section>
	</section>
	<image-form />
</template>

<script setup lang="ts">
import { useShortcuts } from '@/hooks/use-tools'
import { tryOnUnmounted } from '@vueuse/shared'

tryOnUnmounted(useShortcuts())
</script>
