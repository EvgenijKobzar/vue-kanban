<template>
	<v-overlay v-model="state.overlay"/>
	<KanbanArea/>
</template>

<script setup>
	import '../style.css'
	import KanbanArea from "../views/kanban-area.vue";

	import { reactive, onMounted } from 'vue'
	import { useStore } from 'vuex'

	const store = useStore()

	const state = reactive({
		overlay: true,
	})

	onMounted(() => {
		store.dispatch('init').then(()=> state.overlay = false)
	})
</script>