<template>
	<div class="d-flex justify-between">
		<p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
			<a target="_blank" :href="detailPageUrl">{{item.title}}</a>
		</p>
		<slot name="counter"></slot>
	</div>
</template>

<script setup>

const props = defineProps([
	'item',
]);

import {computed} from "vue";
const detailPageUrl = computed(() => 'https://auroralogistic.megaplan.ru' + '/task/' + props.item.id + '/card/')

</script>


<style scoped>
.text-sm {
	font-size: 0.875rem;
	line-height: 1.25rem;
}
.tracking-wide {
	letter-spacing: 0.025em;
}
.font-semibold {
	font-weight: 600;
}
.text-gray-700 {
	--tw-text-opacity: 1;
	color: rgba(55, 65, 81, var(--tw-text-opacity));
}
.font-sans {
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>