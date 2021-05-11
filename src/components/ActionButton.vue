<template>
	<button
		:class="[
			'px-4 py-3 space-x-1 flex items-center justify-center',
			'transition',
			'rounded-md',
			'text-pink-300 bg-pink-300 bg-opacity-15 hover:bg-opacity-20',
			'focus:outline-none focus-visible:bg-opacity-40 focus-visible:ring-2 focus-visible:ring-offset-3 focus-visible:ring-offset-gray-800 focus-visible:ring-pink-200'
		]"
	>
		<slot />
	</button>
</template>
