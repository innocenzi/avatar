<template>
	<button :class="[
		'p-1 flex items-center justify-center',
		'transition',
		'rounded-full',
		'text-gray-500 hover:text-gray-200',
		'focus:outline-none focus-visible:bg-pink-400 focus-visible:bg-opacity-15 focus-visible:text-pink-300'
	]">
		<slot />
	</button>
</template>
