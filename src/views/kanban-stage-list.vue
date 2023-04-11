<template>

		<v-snackbar
				v-model="snackbar"
				:content-class="'ma-4 mx-2'"
				:timeout="1000000"
		>
			<v-chip class="mx-2" size="small" v-for="tag in tags" :key="tag.code" closable @click:close="removeTag(tag)">
				{{tag.value}}
			</v-chip>

			<template v-slot:actions>
				<v-btn
						size="small"
						density="compact"
						icon="mdi-close"
						@click = "removeAllTag"
				/>
			</template>
		</v-snackbar>

	<KanbanStageItem v-for="item in items" :item="item" @find-by-tag-stage-item="findByTag"/>
</template>

<script setup>
	import KanbanStageItem from "./kanban-stage-item.vue";
	import {computed, reactive} from 'vue'
	import { useStore } from 'vuex'
	import Type from "../lib/type.js";
	import {MutationTypes} from "../enum/mutation-types.js";

	const store = useStore()
	const items = computed(() => store.getters.getStages)
	const snackbar = computed(() => Type.isArrayFilled(state.tags))
	const tags = computed(() => Type.isArrayFilled(state.tags) ? state.tags : [])

	const state = reactive({
		tags: [],
	})

	function findByTag(item)
	{
		let tagFound = false;
		state.tags.forEach((tag) => {
			if (tag.code === item.code && tag.value === item.value)
			{
				tagFound = true;
			}

		})
		if (tagFound === false)
		{
			state.tags.push(item)
		}
	}

	function removeAllTag()
	{
		state.tags = [];
		showAllTask();
	}
	function removeTag(item)
	{
		const items = []
		state.tags.forEach((tag) => {
			if (tag.code === item.code && tag.value === item.value)
			{
				// do nothing
			}
			else
			{
				items.push(tag)
			}
		})
		state.tags = items;

		Type.isArrayFilled(items)
				? showTaskByTags(items)
				: showAllTask()

	}
	function showAllTask()
	{
		const stages = store.getters.getStages;

		stages.forEach((stage, index) => {
			const tasks = [];
			stage.tasks.forEach((task, inx) => {
				tasks[inx] = {
					...task,
					hidden: false,
				}

			})
			const params = {
				...stage,
				tasks
			}
			store.commit(MutationTypes.UPD_ITEM, {
				fields: params,
				index
			});
		})
	}
	function showTaskByTags(items)
	{
		const stages = store.getters.getStages;

		stages.forEach((stage, index) => {
			const tasks = [];
			stage.tasks.forEach((task, inx) => {
				tasks[inx] = task;
				let tagFound = false;
				items.forEach((item) => {
					task.tags.forEach((tag) => {
						if (tag.code === item.code && tag.value === item.value)
						{
							tagFound = true;
						}
					})
				})

				if (tagFound)
				{
					tasks[inx].hidden = false;
				}

			})
			const params = {
				...stage,
				tasks
			}
			store.commit(MutationTypes.UPD_ITEM, {
				fields: params,
				index
			});
		})
	}
</script>