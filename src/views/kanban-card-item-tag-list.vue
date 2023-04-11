<template>
		<div class="d-flex mt-3 justify-between items-center">
			<template v-for="tag in items">
				<v-chip v-if="tag.value"
								:size="tag.size"
								:color="tag.color"
								:variant="tag.variant"
								@click="findByTag(tag)"
				>
					{{tag.value}}
				</v-chip>
			</template>
		</div>
</template>

<script setup>
import ColorTheme from "../lib/color-theme.js";
import {MutationTypes} from "../enum/mutation-types.js";
import {useStore} from "vuex";
import {computed} from "vue";
import KanbanCardItemAvatar from "./kanban-card-item-avatar.vue";
import KanbanCardItemAttaches from "./kanban-card-item-attaches.vue";
import KanbanCardItemComments from "./kanban-card-item-comments.vue";

defineProps([
	'items',
]);

const emit = defineEmits([
	'find-by-tag-card-item-tag-list',
]);

const store = useStore()

function findByTag(item)
{
	emit('find-by-tag-card-item-tag-list', { ...item });

	const stages = store.getters.getStages;

	stages.forEach((stage, index) => {
		const tasks = [];
		stage.tasks.forEach((task, inx) => {
			tasks[inx] = task;
			let tagFound = false;
			task.tags.forEach((tag) => {
				if (tag.code === item.code && tag.value === item.value)
				{
					tagFound = true
				}
			})

			if (tagFound === false)
			{
				tasks[inx].hidden = true;
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

