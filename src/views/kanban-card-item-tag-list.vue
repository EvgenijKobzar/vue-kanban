<template>
		<div class="d-flex mt-3 flex-wrap">
			<template v-for="tag in items">
				<v-chip v-if="tag.value" class="mb-2 ml-1"
								:size="tag.size"
								:color="tag.color"
								:variant="tag.variant"
								@click="findByTag(tag)"
				>
					{{getName(tag.value)}}
				</v-chip>
			</template>
		</div>
</template>

<script setup>
import {MutationTypes} from "../enum/mutation-types.js";
import {useStore} from "vuex";
import {computed} from "vue";

defineProps([
	'items',
]);

const emit = defineEmits([
	'find-by-tag-card-item-tag-list',
]);

const store = useStore()

function getName(value)
{
	return value.length > 30
			? value.substring(0, 30) + ' ...'
			: value
}

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