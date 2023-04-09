<template>
	<div class="text-center ma-2">
		<v-btn
				@click="state.snackbar = true"
		>
			Open Snackbar
		</v-btn>
		<v-btn
				v-if="!state.chip1 && !state.chip2 && !state.chip3"
				color="primary"
				dark
				@click="state.chip1 = true, state.chip2 = true, state.chip3 = true, state.snackbar = false"
		>
			Reset Chips
		</v-btn>
		<v-snackbar
				v-model="state.snackbar"
				:content-class="'ma-4 mx-2'"
				:timeout="1000000"
		>
			<v-chip v-model="state.chip1" class="mx-2" size="small" closable >
				Р406КВ 39
			</v-chip>
			<v-chip v-model="state.chip2" class="mx-2" size="small" closable >
				М864КТ 39
			</v-chip>
			<v-chip v-model="state.chip3" class="mx-2" size="small" closable >
				6 апр
			</v-chip>

		</v-snackbar>
	</div>

	<KanbanStageItem v-for="item in items" :item="item"/>
</template>

<script setup>
	import KanbanStageItem from "./kanban-stage-item.vue";
	import {computed, reactive} from 'vue'
	import { useStore } from 'vuex'

	const store = useStore()
	const items = computed(() => store.getters.getStages)

	const state = reactive({
		state: {
			snackbar: false,
			text: `Hello, I'm a snackbar`,
			chip1: true,
			chip2: true,
			chip3: true,
		}
	})

</script>