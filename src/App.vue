<template>
	<section class="flex flex-col items-center h-full">
		<header class="hidden w-full p-10 md:block">
			<shortcuts-popover-button />
		</header>

		<cropper />

		<section class="flex flex-col items-center flex-shrink-0 w-full px-6">
			<toolbar />
			<footer class="flex items-center justify-center p-8 space-x-8 text-xs text-center text-gray-500">
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
import { useEventListener, tryOnMounted } from '@vueuse/core'
import { useShortcuts } from '@/hooks/use-tools'
import { loadFromFile } from './hooks/use-cropper'

tryOnMounted(useShortcuts)

useEventListener(window, 'paste', (paste: ClipboardEvent) => {
	const items = paste.clipboardData?.items

	if (!items) {
		return
	}

	for (let i = 0; i < items.length; i++) {
		// Skip content if not image
		if (!items[i].type.includes('image')) {
			continue
		}

		// Retrieve image on clipboard as blob
		loadFromFile(items[i].getAsFile())

		// We only want one image
		return
	}
})
</script>
