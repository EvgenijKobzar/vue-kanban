<template>
	<div id="app">

		<div class="flex justify-center">
			<div class="min-h-screen flex overflow-x-scroll py-12">
				<div
						v-for="column in columns"
						:key="column.title"
						class="rounded-lg px-3 py-3 column-width rounded mr-4 app-kanban-column-left"
				>
					<p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{column.title}}</p>
					<!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
					<draggable
							v-model="column.tasks"
							:animation="200"
							ghost-class="ghost-card"
							group="tasks"
							itemKey="id"
					>
									<template #item="{ element, index }">
										<task-card :task="element" class="mt-3 cursor-move"/>
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
import axios from "axios";
import { DateTime } from "luxon";

export default {
	name: "App",
	components: {
		TaskCard,
		draggable
	},
	data() {
		return {
			columns: [
				{
					title: "Новые",
					tasks: [
						{
							id: 1,
							title: "Add discount code to checkout page",
							date: "Sep 14",
							type: "Feature Request"
						},
					]
				},
				{
					title: "Выполняется",
					tasks: [
						{
							id: 6,
							title: "Design shopping cart dropdown",
							date: "Sep 9",
							type: "Design"
						},
					]
				},
				{
					title: "Согласование",
					tasks: [
						{
							id: 9,
							title: "Provide documentation on integrations",
							date: "Sep 12"
						},
					]
				},
				{
					title: "Отправка счетов & Архивация",
					tasks: [
						{
							id: 14,
							title: "Add discount code to checkout page",
							date: "Sep 14",
							type: "Feature Request"
						},
					]
				},
				{
					title: "Завершеные",
					tasks: [
						{
							id: 14,
							title: "Add discount code to checkout page",
							date: "Sep 14",
							type: "Feature Request"
						},
					]
				}
			]
		};
	},
	methods: {
		dragEnd(e)
		{
			// const animations = [];
			//
			// this.columns.forEach(()=>)
			//
			// console.log('tasks', this.columns.tasks)
		}
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
.column-width {
	min-width: 320px;
	width: 320px;
}
/* Unfortunately @apply cannot be setup in codesandbox,
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
	opacity: 0.5;
	background: #F7FAFC;
	border: 1px solid #4299e1;
}
</style>