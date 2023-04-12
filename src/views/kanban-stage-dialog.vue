<template>
	<v-row justify="center">
		<v-dialog
				v-model="state.dialog"
				fullscreen
				:scrim="false"
				transition="dialog-bottom-transition"
		>
			<template v-slot:activator="{ props }">
				<v-btn
						color="primary"
						dark
						v-bind="props"
				>
					Open Dialog
				</v-btn>
			</template>
			<v-card>
				<v-toolbar>
					<v-btn
							icon
							dark
							@click="state.dialog = false"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
<!--					<v-toolbar-title>Settings</v-toolbar-title>-->
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn
								variant="text"
								@click="state.dialog = false"
								:color="ColorTheme.getTheme().PRIMARY"
						>
							Сохранить
						</v-btn>
					</v-toolbar-items>
				</v-toolbar>
<template v-for="subheader in subheaders">
				<v-list
						lines="two"
						subheader
				>
					<v-list-subheader>{{subheader.title}}</v-list-subheader>

					<v-list-item v-for="field in subheader.fields">
						<template v-slot:prepend>
							<v-checkbox :label="field.name" @click="check(field.code)"></v-checkbox>
						</template>
					</v-list-item>
				</v-list>
</template>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script setup>

import {reactive} from "vue";
import ColorTheme from "../lib/color-theme.js";

const props = defineProps([
	'subheaders',
]);

const state = reactive({
	dialog: false,
	notifications: false,
	sound: true,
	widgets: false,
})

function check(code)
{

}
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
	transition: transform .2s ease-in-out;
}
</style>