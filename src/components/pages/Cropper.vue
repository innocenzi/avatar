<template>
	<section class="flex flex-col items-center h-full">
		<div class="w-full flex-grow flex flex-col items-center justify-center">
			<div class="w-1/2 h-2/3">
				<cropper
					v-if="state.source"
					ref="element"
					:src="state.source.url"
					:debounce="false"
					@change="change"
				/>
			</div>

			<div class="flex items-center justify-center gap-8 mt-8">
				<preview
					:width="32"
					:height="32"
					status="online"
				/>

				<preview
					:width="40"
					:height="40"
					status="away"
				/>

				<preview
					:width="80"
					:height="80"
				/>

				<preview
					:width="32"
					:height="32"
					status="busy"
				/>

				<preview
					:width="32"
					:height="32"
					status="offline"
				/>
			</div>
		</div>

		<section class="flex flex-col w-full items-center px-6 flex-shrink-0">
			<toolbar />
			<footer class="p-8 flex items-center justify-center text-xs text-gray-500 space-x-8">
				<footer-link href="https://github.com/innocenzi/avatar">
					GitHub
				</footer-link>
				<span>
					Made with <span class="text-[0.7rem]">❤</span> by
					<footer-link class="font-bold" href="https://twitter.com/enzoinnocenzi">Enzo Innocenzi</footer-link>
				</span>
				<footer-link href="https://github.com/innocenzi/avatar/issues">
					Feedback
				</footer-link>
			</footer>
		</section>
	</section>
</template>

<script setup lang="ts">
import { state, element, change } from '@/hooks/use-cropper'
import { Cropper } from 'vue-advanced-cropper'
</script>

<style>
.vue-advanced-cropper {
  text-align: center;
  position: relative;
  user-select: none;
  max-height: 100%;
  max-width: 100%;
  direction: ltr;
	overflow: hidden;
	height: 100%;
}

.vue-advanced-cropper__image {
	user-select: none;
	position: absolute;
	transform-origin: center;
	max-width: none !important;
	filter: opacity(20%);
	overflow: hidden;
}

.vue-advanced-cropper__stretcher {
	pointer-events: none;
	position: relative;
	max-width: 100%;
	max-height: 100%;
	display: none;
}

  .vue-advanced-cropper__background, .vue-advanced-cropper__foreground {
    opacity: 1;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%; }
  .vue-advanced-cropper__foreground {
    opacity: 0.5;
    /* background: black; */
	}
  .vue-advanced-cropper__boundaries {
    opacity: 1;
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%; }
  .vue-advanced-cropper__cropper-wrapper {
    width: 100%;
    height: 100%; }
  .vue-advanced-cropper__image-wrapper {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%; }
  .vue-advanced-cropper__stencil-wrapper {
    position: absolute; }

.vue-line-wrapper {
  background: none;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center; }
  .vue-line-wrapper--north, .vue-line-wrapper--south {
    height: 12px;
    width: 100%;
    left: 0;
    transform: translateY(-50%); }
  .vue-line-wrapper--north {
    top: 0;
    cursor: n-resize; }
  .vue-line-wrapper--south {
    top: 100%;
    cursor: s-resize; }
  .vue-line-wrapper--east, .vue-line-wrapper--west {
    width: 12px;
    height: 100%;
    transform: translateX(-50%);
    top: 0; }
  .vue-line-wrapper--east {
    left: 100%;
    cursor: e-resize; }
  .vue-line-wrapper--west {
    left: 0;
    cursor: w-resize; }
  .vue-line-wrapper--disabled {
    cursor: auto; }

.vue-bounding-box {
  position: relative;
  height: 100%;
  width: 100%; }
  .vue-bounding-box__handler {
    position: absolute; }
    .vue-bounding-box__handler--west-north {
      left: 0;
      top: 0; }
    .vue-bounding-box__handler--north {
      left: 50%;
      top: 0; }
    .vue-bounding-box__handler--east-north {
      left: 100%;
      top: 0; }
    .vue-bounding-box__handler--east {
      left: 100%;
      top: 50%; }
    .vue-bounding-box__handler--east-south {
      left: 100%;
      top: 100%; }
    .vue-bounding-box__handler--south {
      left: 50%;
      top: 100%; }
    .vue-bounding-box__handler--west-south {
      left: 0;
      top: 100%; }
    .vue-bounding-box__handler--west {
      left: 0;
      top: 50%; }

.vue-preview-result {
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  height: 100%;
  width: 100%; }
  .vue-preview-result__wrapper {
    position: absolute; }
  .vue-preview-result__image {
    pointer-events: none;
    position: relative;
    user-select: none;
    transform-origin: center;
    max-width: none !important; }

.vue-draggable-area {
  position: relative; }

.vue-simple-line {
  background: none;
  transition: border 0.5s;
  border-color: rgba(255, 255, 255, 0.3);
  border-width: 0;
  border-style: solid; }
  .vue-simple-line--south, .vue-simple-line--north {
    height: 0;
    width: 100%; }
  .vue-simple-line--east, .vue-simple-line--west {
    height: 100%;
    width: 0; }
  .vue-simple-line--east {
    border-right-width: 1px; }
  .vue-simple-line--west {
    border-left-width: 1px; }
  .vue-simple-line--south {
    border-bottom-width: 1px; }
  .vue-simple-line--north {
    border-top-width: 1px; }
  .vue-simple-line--hover {
    opacity: 1;
    border-color: white; }

.vue-handler-wrapper {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px; }
  .vue-handler-wrapper__draggable {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center; }
  .vue-handler-wrapper--west-north {
    cursor: nw-resize; }
  .vue-handler-wrapper--north {
    cursor: n-resize; }
  .vue-handler-wrapper--east-north {
    cursor: ne-resize; }
  .vue-handler-wrapper--east {
    cursor: e-resize; }
  .vue-handler-wrapper--east-south {
    cursor: se-resize; }
  .vue-handler-wrapper--south {
    cursor: s-resize; }
  .vue-handler-wrapper--west-south {
    cursor: sw-resize; }
  .vue-handler-wrapper--west {
    cursor: w-resize; }
  .vue-handler-wrapper--disabled {
    cursor: auto; }

.vue-preview {
  overflow: hidden;
  box-sizing: border-box;
  position: relative; }
  .vue-preview--fill {
    width: 100%;
    height: 100%;
    position: absolute; }
  .vue-preview__wrapper {
    position: absolute;
    height: 100%;
    width: 100%; }
  .vue-preview__image {
    pointer-events: none;
    position: absolute;
    user-select: none;
    transform-origin: center;
    max-width: none !important; }

.vue-circle-stencil {
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: content-box;
  cursor: move; }
  .vue-circle-stencil__preview {
    border-radius: 50%;
    position: absolute;
    width: 100%;
    height: 100%; }
  .vue-circle-stencil--movable {
    cursor: move; }

.vue-rectangle-stencil {
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box; }
  .vue-rectangle-stencil__preview {
    position: absolute;
    width: 100%;
    height: 100%; }
  .vue-rectangle-stencil--movable {
    cursor: move; }

.vue-simple-handler {
  display: block;
  background: white;
  height: 10px;
  width: 10px; }

</style>
