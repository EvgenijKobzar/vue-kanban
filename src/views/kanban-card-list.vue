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
	<KanbanStageDialog v-if="stage.dialog.subheaders"
			:subheaders="stage.dialog.subheaders"
			:show="state.showDialog"
			:itemId="state.itemIdDialog"
			@on-cancel-close-stage-dialog="onCancelDialog"
			@on-save-close-stage-dialog="onSaveDialog"></KanbanStageDialog>
</template>

<script setup>
	import draggable from "vuedraggable";
	import KanbanCardItem from "./kanban-card-item.vue";
	import {MutationTypes} from "../enum/mutation-types.js";

	import {computed, reactive} from 'vue'
	import { useStore } from 'vuex'
	import KanbanStageDialog from "./kanban-stage-dialog.vue";

	const state = reactive({
		showDialog: false,
		itemIdDialog: null,
	})


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

	function resolveItem(originalEvent)
	{
		return originalEvent?.added
				? originalEvent.added.element
				: originalEvent?.moved
						? originalEvent.moved.element
						: originalEvent?.removed
								? originalEvent.removed.element
								: null
	}
	function onStageChange(originalEvent)
	{
		const item = resolveItem(originalEvent)

		if (item?.id)
		{
			if (originalEvent?.added)
			{
				setDialogParams({show: true, itemId: item.id,})

				store.dispatch('updateTask', {
					id: item.id,
					fields: {
						customFieldStatus: props.stage.title
					}
				})
			}
			else if (originalEvent?.removed)
			{
				setDialogParams({show: false, itemId: item.id,})
			}
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

	function setDialogParams(params)
	{
		state.showDialog = params.show
		state.itemIdDialog = params.itemId
	}

	function onSaveDialog(e)
	{
		store.dispatch('addComment', {
			fields: {
				content: 'addComment',
				taskId: e.item.id,
			}
		})
		.then(() => setDialogParams({show: false, itemId: e.item.id,}))
	}

	function onCancelDialog(e)
	{
		setDialogParams({show: false, itemId: e.item.id,})
	}

</script>