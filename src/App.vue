<template>
	<div id="app">

		<div class="d-flex justify-center">
			<div class="min-h-screen d-flex overflow-x-scroll overflow-y-hidden py-12 px-12">

<!--				<Dialog v-if="getDialog(column)" :config="confirm.config" :show="confirm.show"/>-->


				<div
						v-for="column in columns"
						:key="column.title"
						class="ma-1 rounded-lg column-width app-kanban-column-left"
				>

					<v-chip class="w-100" :style="{background: column.background}" text-color="white" label>
						<v-icon start icon="mdi-label"/>
						{{column.title}}</v-chip>

					<v-container>
						<v-row align="center" justify="center">
							<v-hover>
								<template v-slot:default="{ isHovering, props }">
									<v-btn size="small" v-bind="props" :color="isHovering ? 'primary' : undefined" variant="flat" density="compact" icon="mdi-plus"></v-btn>
								</template>
							</v-hover>
						</v-row>
					</v-container>
<!--					-->
					<!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
<!--					@update:modelValue="modelValue"-->
					<draggable
							v-model="column.tasks"
							:animation="200"

							ghost-class="ghost-card"
							group="tasks"
							itemKey="id"
							:move="move"
							@change="changes"
					>
									<template #item="{ element, index }">
										<task-card :task="element" class="mt-3 cursor-move" data-status="activated"/>
									</template>
					</draggable>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import draggable from "vuedraggable";
import TaskCard from "./components/TaskCard.vue";
import Dialog from "./components/Dialog.vue";
import axios from "axios";
import { DateTime } from "luxon";

export default {
	name: "App",
	components: {
		TaskCard,
		draggable,
		Dialog,
	},
	/*
	*
	* новая
	* обработка заявки(работа с клиентом), //выполняется
	* //отправка заявки водителю(финальный шаг),
	*
	* выполнение(эксплуатация транспорта) //перевозка
	* (эксплуатация транспорта)//завершение выполнение, сдача документов (эксплуатация транспорта)
	*
	* //приемка документов(менеджер по транспорту)
	*
	* на согласование(менеджер по транспорту) //приемка документов(бумажный/электронный вид) + согласование
	* //выполнено(менеджер по транспорту)
	*
	* на отправка(бухгалтерия) // архивация и отправка
	* выполнено(бухгалтерия)
	* Сделано
	*
	* */
	data() {
		return {
			confirm: {
				show: false,
				config: {}
			},
			columns: [
				{
					title: "Новые",
					background: "#00c4fb",
					tasks: [
						{
							id: 142,
							title: "Add discount code to checkout page",
							date: "Sep 14",
							type: "Feature Request"
						},
						{
							id: 112,
							title: "Add discount code to checkout page",
							date: "Sep 14",
							type: "Feature Request"
						},
					]
				},
				{
					title: "Выполняется (менеджер)",
					background: "#47d1e2",
					tasks: []
				},
				{
					title: "К перевозке (транспорт)",
					background: "#00736a",
					tasks: [],
					dialog: {
						confirm: ""
						/*
						* Информация для перевозки
						* - водитель проинформирован
						* по дате														checkbox
						* месте															checkbox
						* контактах на загрузке/выгрузке		checkbox
						* - водитель получил заявку					checkbox
						* */
					}
				},
				{
					title: "Выполнено (транспорт)",
					background: "#ff5752",
					tasks: []
				},
				{
					title: "Счета (бухгалтерия)",
					background: "#ff00ff",
					tasks: [],
					dialog: {
						confirm: [
								{
									title: 'Выставление счетов',
									items: [
											{
												name: 'Клиент (ссылка в 4Logistic)',
												type: 'text'
											},
										{
												name: 'итоговая сумма для выставления счета',
												type: 'text'
											},
										{
												name: 'дополнительная информация для выставления счета',
												type: 'text'
											},

									]
								},
						]
						/*
						* Выставление счетов
						* - Клиент (ссылка в 4Logistic)											text
						* - итоговая сумма для выставления счета						text
						* - дополнительная информация для выставления счета	text
						* */
					}
				},
				{
					title: "Выполнено (бухгалтерия)",
					background: "#aba100",
					tasks: [],
					dialog: {
						confirm: ""
						/*
						* Выставление счетов
						* - Акт и счет прикреплены к задаче	checkbox
						* */
					}
				},
				{
					title: "На согласование (менеджер)",
					background: "#662793",
					tasks: []
				},
				{
					title: "На отправке (бухгалтерия)",
					background: '#468ee5',
					tasks: []
				},
				{
					title: "Выполнено (бухгалтерия)",
					background: '#ffab00',
					tasks: [],
					dialog: {
						confirm: ""
						/*
						* Отправка документов
						* - курьерская служба text
						* - трек							text
						* - отвозим сами 			checkbox
						* Архивация
						* - номер в архиве		text
						* */
					}
				},
				{
					title: "Сделано",
					background: '#00a74c',
					tasks: [],
					dialog: {
						confirm: ""
						/*
						*
						* */
					}
				}
			]
		};
	},
	// computed: {
	//
	// 	getDialog: function ()
	// 	{
	// 		return this.column?.dialog.confirm
	// 	}
	// },
	methods: {

		getDialog(column)
		{
			return column?.dialog ? column.dialog.confirm : null
		},

		move(e, originalEvent)
		{
			// console.log(originalEvent)
			// return false;
		},

		changes(originalEvent) {

			if (originalEvent?.removed)
			{
				console.log('removed', originalEvent?.removed.element.id)
			}
			else if(originalEvent?.added)
			{
				console.log('added', originalEvent?.added.element.id)
				const item = originalEvent?.added.element;

				this.columns.forEach((column) => {

					column.tasks.forEach((task) => {
						if(task.id === item.id)
						{
							if (column?.dialog)
							{
								this.confirm.show = true
							}
						}
					})
				})
			}
			else if(originalEvent?.moved)
			{
				console.log('moved', originalEvent?.moved.element.id)
			}
			else
			{
				console.log('AHTUNG', originalEvent)
			}
		},

		modelValue(value)
		{
			console.log('value', value)
			return true;
		},
	},
	mounted() {

		// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


		axios({
			method: 'get',
			baseURL: 'https://kanban.ft24.ru/rest/',
			url: 'task.task.list?select[]=id&filter[id]=1&order[id]=asc',
			// withCredentials: false,

		}).then((r)=>{

			this.columns.forEach((column, index) => {

				r.data.tasks.forEach((task) => {
					if(task.Category130CustomFieldStatus === column.title)
					{
						this.columns[index].tasks.push({
							id: task.id,
							title: task.name,
							o: task.subject,
							date: DateTime.fromISO(task.timeCreated.value).toLocaleString(DateTime.DATE_MED),
							type: task.parent.name,
						})

					}
					else
					{
						console.log(task.Category130CustomFieldStatus)
					}
				})
			})
		})
	}
};
</script>

<style scoped>
.ghost-card {
	opacity: 0.5;
	background: #F7FAFC;
	border: 1px solid #4299e1;
}

.column-width {
	min-width: 240px;
	width: 320px;
}

.justify-center {
	justify-content: center;
}

.min-h-screen {
	min-height: 100vh;
}

.overflow-x-scroll {
	overflow-x: scroll;
}

.overflow-y-hidden {
	overflow-y: hidden;
}

.py-12 {
	padding-top: 3rem;
	padding-bottom: 3rem;
}

.rounded {
	border-radius: 0.25rem;
}

.rounded-lg {
	border-radius: 0.5rem;
}
</style>