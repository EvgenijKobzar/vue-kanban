<template>
	<div class="bg-white shadow rounded px-3 pt-3 pb-3 mr-1 border border-white mt-2 cursor-move" >

		<KanbanCardItemTitle :item="item">
			<template v-slot:counter><KanbanCardItemComments :item="item"/></template>
		</KanbanCardItemTitle>

		<KanbanCardItemAttaches :item="item"/>
		<KanbanCardItemTagList 	:items="item.tags" @find-by-tag-card-item-tag-list="findByTag"/>
		<KanbanCardItemAvatar 	:item="item.responsible"/>
	</div>
</template>

<script setup>
	import KanbanCardItemAvatar from "./kanban-card-item-avatar.vue";
	import KanbanCardItemAttaches from "./kanban-card-item-attaches.vue";
	import KanbanCardItemComments from "./kanban-card-item-comments.vue";
	import KanbanCardItemTagList from "./kanban-card-item-tag-list.vue";
	import KanbanCardItemTitle from "./kanban-card-item-title.vue";

	defineProps([
		'item',
	]);

	const emit = defineEmits([
		'find-by-tag-card-item',
	]);

	function findByTag(item)
	{
		emit('find-by-tag-card-item', item);
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