<template>
	<button :class="[
		'p-1',
		'transition',
		'rounded-full',
		'text-gray-500 hover:text-gray-200',
		'focus:outline-none focus-visible:bg-pink-400 focus-visible:bg-opacity-25 focus-visible:text-pink-300 focus-visible:border focus-visible:border-pink-600	'
	]">
		<slot />
	</button>
</template>
