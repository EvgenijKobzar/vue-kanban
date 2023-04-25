<template>
	<v-row justify="center">
		<v-dialog
				persistent
				v-model="state.dialog"
				width="50%"
				fullscreen
				contentClass="dialog-right"
				transition="scroll-x-reverse-transition"
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
											sm="12"
											md="12"
											v-for="(field, inx) in subheader.fields"
									>
										<v-text-field						v-if="field.type === DialogFieldTypes.TEXT"
												:label="field.name"
												v-model="state.dialogFields[field.name]"
										></v-text-field>
										<v-text-field						v-if="field.type === DialogFieldTypes.MONEY_RUB"
												:label="field.name"
												mask="#"
												suffix="руб"
												v-model="state.dialogFields[field.name]"
										></v-text-field>
										<v-textarea							v-if="field.type === DialogFieldTypes.TEXTAREA"
												:label="field.name"
												auto-grow
												variant="outlined"
											  rows="3"
											  row-height="25"
												v-model="state.dialogFields[field.name]"
										></v-textarea>
										<v-checkbox							v-else-if="field.type === DialogFieldTypes.CHECKBOX"
												:label="field.name"
												v-model="state.dialogFieldsCheckBox[field.name]"
										></v-checkbox>
										<v-select								v-else-if="field.type === DialogFieldTypes.SELECT"
												:items="field.variant"
												:label="field.name"
												v-model="state.dialogFields[field.name]"
										></v-select>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>
				</template>
				<v-card-text>
<!--					<small>*обязательные поля</small>-->
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

const state = reactive({
	dialog: false,
	wait: false,
	dialogFields: [],
	dialogFieldsCheckBox: [],
})

const detailPageUrl = computed(() => props.show)

watch(detailPageUrl, (newX) => {
	state.dialog = newX
	state.wait = !newX
})

function makeMessageToComment()
{
	const message = []

	for (const [key, value] of Object.entries(state.dialogFields)) {
		message.push(`${key}: ${value}`)
	}

	for (const [key, value] of Object.entries(state.dialogFieldsCheckBox)) {
		message.push(`${key}: ${value ? 'Да': 'Нет'}`)
	}

	return message.join('\r\n');
}

function save()
{
	state.wait = true;
	emit('on-save-close-stage-dialog', {item: {id: props.itemId}, comment: makeMessageToComment()});
}
function cancel()
{
	emit('on-cancel-close-stage-dialog', {item: {id: props.itemId}});
}
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
	transition: transform .2s ease-in-out;
}

.dialog-right {
	left: auto !important;
	right:0;
}
</style>