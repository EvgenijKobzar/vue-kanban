<template>
	<v-row justify="center">
		<v-dialog
				persistent
				v-model="state.dialog"
				width="1024"
		>
			<v-card>
				<template v-for="subheader in subheaders">
						<v-card-title>
							<span >{{subheader.title}}</span>
						</v-card-title>
						<v-card-text>
							<v-container>
								<v-row>
									<v-col
											cols="12"
											sm="6"
											md="6"
											v-for="field in subheader.fields"
									>
										<v-text-field						v-if="field.type === DialogFieldTypes.TEXT"
												:label="field.name"

										></v-text-field>
										<v-textarea							v-if="field.type === DialogFieldTypes.TEXTAREA"
												:label="field.name"
												auto-grow
												variant="outlined"
											  rows="3"
											  row-height="25"
										></v-textarea>
										<v-checkbox							v-else-if="field.type === DialogFieldTypes.CHECKBOX"
												:label="field.name"
										></v-checkbox>
										<v-select								v-else-if="field.type === DialogFieldTypes.SELECT"
												:items="field.variant"
												:label="field.name"
										></v-select>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>
				</template>
				<v-card-text>
					<small>*обязательные поля</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
							color="pink-darken-1"
							variant="text"
							@click="cancel"
					>
						Отменить
					</v-btn>
					<v-btn
							:disabled="state.wait"
							:loading="state.wait"
							color="green-darken-1"
							variant="text"
							@click="save"
					>
						Сохранить
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script setup>

import {computed, reactive, watch} from "vue";
import {DialogFieldTypes} from "../enum/dialog-field-types.js";


const props = defineProps([
	'subheaders',
	'show',
	'itemId',
]);

const emit = defineEmits([
	'on-cancel-close-stage-dialog',
	'on-save-close-stage-dialog',
]);

const detailPageUrl = computed(() => props.show)

watch(detailPageUrl, (newX) => {
	state.dialog = newX
	state.wait = !newX
})

function save()
{
	state.wait = true;
	emit('on-save-close-stage-dialog', {item: {id: props.itemId}});
}
function cancel()
{
	emit('on-cancel-close-stage-dialog', {item: {id: props.itemId}});
}

const state = reactive({
	dialog: false,
	wait: false,
})
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
	transition: transform .2s ease-in-out;
}
</style>