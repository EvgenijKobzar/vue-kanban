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
				@click="addChips()"
		>
<!--			@click="state.chip1 = true, state.chip2 = true, state.chip3 = true, state.snackbar = false"-->
			Reset Chips
		</v-btn>
		<v-snackbar
				v-model="state.snackbar"
				:content-class="'ma-4 mx-2'"
				:timeout="1000000"

		>
			<v-chip class="mx-2" size="small" v-for="chip in state.state.chips" :key="chip.id">
				{{chip.title}}
			</v-chip>

			<template v-slot:actions>
				<v-btn
						size="small"

					density="compact"
						icon="mdi-close"
						
				/>
			</template>
		</v-snackbar>
	</div>

	<KanbanStageItem v-for="item in items" :item="item" @find-by-tag-stage-item="findByTag"/>
</template>

<script setup>
	import KanbanStageItem from "./kanban-stage-item.vue";
	import {computed, reactive} from 'vue'
	import { useStore } from 'vuex'
	import Type from "./../lib/type";

	const store = useStore()
	const items = computed(() => {

		const stages = store.getters.getStages;
		const stageList = [];

		if (Type.isArrayFilled(state.tags))
		{
			stages.forEach((stage, index) => {

				const tasksByTag = [];
				stage.tasks.forEach((task) => {

					let tagFound = false;
					task.tags.forEach((tag) => {
						state.tags.forEach((stateTag) => {
							if( stateTag.code === tag.code && stateTag.value === tag.value)
							{
								tagFound = true;
							}
						})
					})

					if (tagFound)
					{
						tasksByTag.push(task)
					}
				})

				stageList[index] = stage;
				stageList[index].tasks = tasksByTag;

			})

			return stageList;
		}
		else
		{
			return store.getters.getStages;
		}


// console.log('taskInxList', taskInxList)
// console.log('state.tags', state.tags)

		// state.list = store.getters.getStages;

		// return state.list
	})

	const state = reactive({
		tags: [],
		state: {
			snackbar: false,
			text: `Hello, I'm a snackbar`,
			chips:[
					{title:'Р406КВ 39', id: 1,},
					{title:'М864КТ 39', id: 2,},
					{title:'6 апр', id: 3,},
			]
		}
	})

	function addChips()
	{
		state.state.chips.push({title:'Р406КВ 39', id: 4,})
	}

	function findByTag(tag)
	{
		state.tags.push(tag)
	}

	const chips = computed(() => {

		return state.chips
	})

</script>