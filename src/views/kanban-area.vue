<template>
	<div class="d-flex justify-center">
		<div class="min-h-screen d-flex overflow-x-scroll overflow-y-hidden py-12 px-12">

			<KanbanStageList/>

		</div>
	</div>
</template>

<script setup>
	import KanbanStageList from "./kanban-stage-list.vue";
</script>