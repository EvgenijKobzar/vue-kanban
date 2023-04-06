<template>


	<draggable
			v-model="myList"
			:animation="200"

			ghost-class="ghost-card"
			group="tasks"
			itemKey="id"

	>

<!--		:move="move"-->
<!--		@change="changes"-->
		<template #item="{ element, index }">
			<KanbanCardItem :item="element"/>
		</template>
	</draggable>


</template>

<script setup>
	import draggable from "vuedraggable";
	import KanbanCardItem from "./kanban-card-item.vue";
	import {MutationTypes} from "../enum/mutation-types.js";

	import { computed } from 'vue'
	import { useStore } from 'vuex'

	const props = defineProps([
		'stage',
	]);


	const store = useStore()
	const myList = computed({
		// getter
		get() {
			return store.getters.getStageByName(props.stage.title).tasks
		},
		// setter
		set(newValue) {

			const stage = store.getters.getStageByName(props.stage.title);
			const params =
			{
				index: store.getters.getStageIndexByName(props.stage.title),
				fields: {
					title: stage.title,
					background: stage.background,
					tasks: newValue
				}
			}
			store.commit(MutationTypes.UPD_ITEM, params);
		}
	})

	function modelValue(value)
	{
		console.log('value', value)
		return true;
	}


		// myList: {
		// 	get() {
		// 		return this.$store.state.myList
		// 	},
		// 	set(value) {
		// 		this.$store.commit('updateList', value)
		// 	}
		// }
	function move(e, originalEvent)
	{
		// console.log(originalEvent)
		// return false;
	}

	function changes(originalEvent)
	{

		console.log(originalEvent);
		// if (originalEvent?.removed)
		// {
		// 	console.log('removed', originalEvent?.removed.element.id)
		// }
		// else if(originalEvent?.added)
		// {
		// 	console.log('added', originalEvent?.added.element.id)
		// 	const item = originalEvent?.added.element;
		//
		// 	this.columns.forEach((column) => {
		//
		// 		column.tasks.forEach((task) => {
		// 			if(task.id === item.id)
		// 			{
		// 				if (column?.dialog)
		// 				{
		// 					this.confirm.show = true
		// 				}
		// 			}
		// 		})
		// 	})
		// }
		// else if(originalEvent?.moved)
		// {
		// 	console.log('moved', originalEvent?.moved.element.id)
		// }
		// else
		// {
		// 	console.log('AHTUNG', originalEvent)
		// }
	}


</script>