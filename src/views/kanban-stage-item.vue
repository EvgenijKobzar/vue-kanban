<template>
	<div class="rounded-lg column-width app-kanban-column-left">
		<KanbanStageItemLabel :item="item"/>
		<Plus/>
		<KanbanCardList :stage="item" @find-by-tag-card-list="findByTag"/>
	</div>

</template>

<script setup>
	import KanbanStageItemLabel from "./kanban-stage-item-label.vue";
	import Plus from "./elements/plus.vue";
	import KanbanCardList from "./kanban-card-list.vue";

	defineProps([
		'item',
	]);

	const emit = defineEmits([
		'find-by-tag-stage-item',
	]);

	function findByTag(tag)
	{
		emit('find-by-tag-stage-item', tag);
	}

</script>