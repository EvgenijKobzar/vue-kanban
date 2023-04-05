<template>
	<div class="d-flex justify-center">
		<div class="min-h-screen d-flex overflow-x-scroll overflow-y-hidden py-12 px-12">

			<KanbanColumnList/>

		</div>
	</div>
</template>

<script setup>
	import KanbanColumnList from "./kanban-column-list.vue";
</script>