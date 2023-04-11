<template>
	<draggable
			v-model="items"
			:animation="200"
			ghost-class="ghost-card"
			group="tasks"
			itemKey="id"
			@change="onStageChange"
	>

<!--		:move="move"-->
		<template #item="{ element, index }">
			<KanbanCardItem :item="element" v-if="element.hidden === false" @find-by-tag-card-item="findByTag"/>
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

	const emit = defineEmits([
		'find-by-tag-card-list',
	]);

	const store = useStore()
	const items = computed({
		get() {
			return store.getters.getStageByName(props.stage.title).tasks
		},
		set(items) {
			const stage = store.getters.getStageByName(props.stage.title);
			const params =
			{
				index: store.getters.getStageIndexByName(props.stage.title),
				fields: {
					title: stage.title,
					background: stage.background,
					tasks: items
				}
			}
			store.commit(MutationTypes.UPD_ITEM, params);
		}
	})

	function findByTag(tag)
	{
		emit('find-by-tag-card-list', tag)
	}

	function onChange(e)
	{
		console.log(e)
	}

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

	function onStageChange(originalEvent)
	{
		const item = originalEvent?.added
				? originalEvent.added.element
				: originalEvent?.moved
						? originalEvent.moved.element
						: null

		if (item?.id)
		{
			store.dispatch('updateTask', {
				id: item.id,
				fields: {
					customFieldStatus: props.stage.title
				}
			});
		}

		if (originalEvent?.removed)
		{
			console.log('removed', originalEvent?.removed.element.id)
		}
		else if(originalEvent?.added)
		{
			console.log('moved', originalEvent.added)
		}
		else if(originalEvent?.moved)
		{
			console.log('moved', originalEvent.moved)
		}
		else
		{
			console.log('AHTUNG', originalEvent)
		}
	}


</script>