<template>
	<KanbanStageItem v-for="item in items" :item="item"/>
</template>

<script setup>
	import KanbanStageItem from "./kanban-stage-item.vue";
	import { computed } from 'vue'
	import { useStore } from 'vuex'

	const store = useStore()
	const items = computed(() => store.getters.getStages)
</script>