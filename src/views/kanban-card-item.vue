<template>
	<div class="bg-white shadow rounded px-3 pt-3 pb-3 mr-2 border border-white" >
		<div class="d-flex justify-between">
			<p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
				<a target="_blank" :href="getUrlById(item.id)">{{item.title}}</a>
			</p>
<!--			<p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{item.title}}</p>-->
			<v-badge										v-if="item.unreadCommentsCount"
					:color="ColorTheme.getTheme().ALERT"
					text-color="white"
					:content="item.unreadCommentsCount"
					inline
			></v-badge>
			<v-badge										v-else-if="item.commentsCount"
					color="grey-lighten-1"
					text-color="white"
					:content="item.commentsCount"
					inline
			></v-badge>
		</div>

<!--		<div class="d-flex mt-3 justify-between text-sm">-->
<!--			<template v-html="item.subject"></template>-->
<!--		</div>-->
		<div class="d-flex mt-3 justify-between text-sm" >

			<v-chip											v-if="item.commentsAttachesCount"
					size="x-small"
					:color="ColorTheme.getTheme().PRIMARY"
			>
				<v-icon start icon="mdi-paperclip"></v-icon>
				+{{item.commentsAttachesCount}}
			</v-chip>

		</div>
		<div class="d-flex mt-3 justify-between items-center">

			<v-chip
					size="x-small"
					:color="ColorTheme.getTheme().PRIMARY"
					variant="outlined"
			>
				{{dateFormatted}}

			</v-chip>
			<!--      <span class="text-sm text-gray-600">{{item.date}}</span>-->

			<v-chip
					size="x-small"
					:color="Color.stringToColour(item.type)"
					text-color="white"
			>
								{{item.type}}
			</v-chip>
		</div>
		<div class="d-flex pt-3 justify-start">

			<v-avatar size="24" image="//pc31.megaplan.ru/hosts/auroralogistic.megaplan.ru/100x100/attach/SdfFileM_File/File/25/afe47c503483e11bae50305bddaa448d.png"/>
		</div>
	</div>
</template>

<script setup>
	import { computed } from 'vue'
	import Color from "../lib/color.js";
	import ColorTheme from "../lib/color-theme.js";

	const props = defineProps([
		'item',
	]);

	const dateFormatted = computed(() => props.item.date.split(' ')[0].toString()
			+ ' '
			+	props.item.date.split(' ')[1].toString().replace('.', ''))

	function getUrlById(id)
	{
		return 'https://auroralogistic.megaplan.ru' + '/task/' + id + '/card/';
	}
</script>


<style scoped>
.bg-white {
	--tw-bg-opacity: 1;
	background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}
.shadow {
	--tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.rounded {
	border-radius: 0.25rem;
}
.px-3 {
	padding-left: 0.75rem;
	padding-right: 0.75rem;
}
.pt-3 {
	padding-top: 0.75rem;
}
.pb-5 {
	padding-bottom: 1.25rem;
}
.border {
	border-width: 1px;
}
.border-white {
	--tw-border-opacity: 1;
	border-color: rgba(255, 255, 255, var(--tw-border-opacity));
}

.text-gray-700 {
	--tw-text-opacity: 1;
	color: rgba(55, 65, 81, var(--tw-text-opacity));
}
.font-semibold {
	font-weight: 600;
}
.font-sans {
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.tracking-wide {
	letter-spacing: 0.025em;
}
.text-sm {
	font-size: 0.875rem;
	line-height: 1.25rem;
}

.mt-3 {
	margin-top: 0.75rem;
}
.justify-between {
	justify-content: space-between;
}
.items-center {
	align-items: center;
}

.text-gray-600 {
	--tw-text-opacity: 1;
	color: rgba(75, 85, 99, var(--tw-text-opacity));
}

.w-6 {
	width: 1.5rem;
}
.h-6 {
	height: 1.5rem;
}
.rounded-full {
	border-radius: 9999px;
}
.ml-3 {
	margin-left: 0.75rem;
}

.font-semibold {
	font-weight: 600;
}
.px-3 {
	padding-left: 0.75rem;
	padding-right: 0.75rem;
}
.h-6 {
	height: 1.5rem;
}
.rounded-full {
	border-radius: 9999px;
}
.text-xs {
	font-size: 0.75rem;
	line-height: 1rem;
}
.items-center {
	align-items: center;
}
.w-2 {
	width: 0.5rem;
}
.h-2 {
	height: 0.5rem;
}
.mr-1 {
	margin-right: 0.25rem;
}
</style>