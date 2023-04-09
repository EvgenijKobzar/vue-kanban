<template>
	<div class="ma-1 rounded-lg column-width app-kanban-column-left">
		<KanbanStageItemLabel :item="item"/>
		<Plus/>
		<KanbanCardList :stage="item" />
	</div>

</template>

<script setup>
	import KanbanStageItemLabel from "./kanban-stage-item-label.vue";
	import Plus from "./elements/plus.vue";
	import KanbanCardList from "./kanban-card-list.vue";

	defineProps([
		'item',
	]);
</script>