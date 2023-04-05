import Type from "../../lib/type.js";
import Text from "../../lib/text.js";
import {Module} from "../../enum/module.js";
import {Mutation} from "../../enum/mutation.js";
import Rest from "../../provider/rest.js";
import {DateTime} from "luxon";


export default class Column
{
	getName()
	{
		return Module.COLUMN
	}
	getState()
	{
		return {
			column: [],
			errors: []
		}
	}

	getBaseItem()
	{
		return {
			sort: 0,
			title: null,
			background: null,
			tasks: [],
		};
	}

	static getTasksItem()
	{
		return {
			id: 0,
			date: "",
			type: "",
			title: "",
		};
	}

	static validate(fields)
	{
		const result = {};

		if (Type.isObject(fields.column))
		{
			result.column = Column.validateColumn(fields.column);
		}

		return result;
	}

	static validateColumn(fields)
	{
		const result = {};

		if (Type.isString(fields.title))
		{
			result.title = fields.title.toString();
		}

		if (Type.isString(fields.background))
		{
			result.background = fields.background.toString();
		}

		if (Type.isObject(fields.tasks))
		{
			result.tasks = [];
			fields.tasks.forEach((item)=>{
				let fields = Column.validateTasks(item);
				result.tasks.push(fields);
			})
		}

		return result;
	}

	static validateTasks(fields)
	{
		const result = {};

		if (Type.isNumber(fields.id) || Type.isString(fields.id))
		{
			result.id = Text.toNumber(fields.id);
		}

		if (Type.isString(fields.title))
		{
			result.title = fields.title.toString();
		}

		if (Type.isString(fields.type))
		{
			result.type = fields.type.toString();
		}

		if (Type.isString(fields.date))
		{
			result.date = DateTime.fromISO(fields.date).toLocaleString(DateTime.DATE_MED)
		}

		return result;
	}

	getActions()
	{
		return {
			addItem: ({ commit }, payload) =>
			{
				payload.fields = Column.validateColumn(payload.fields);
				commit('addItem', payload);
			},

			init({ commit })
			{
				return new Promise((resolve, reject) =>
				{
					// const cmd = this.serviceName + 'list';
					const cmd = 'task.task.list';

					(new Rest({
						cmd
					}))
					.then((r) => {

						const columns = [];

						r.data.tasks.forEach((task) => {
							if (task?.Category130CustomFieldStatus)
							{
								columns.push(task.Category130CustomFieldStatus)
							}
						})

						const uniq = [ ...new Set(columns) ];
						uniq.forEach((title) => {
							let list = [];
							r.data.tasks.forEach((task) => {
								if( title === task?.Category130CustomFieldStatus)
								{
									list.push({
										id: task.id,
										title: task.name,
										date: task.timeCreated.value,
										type: task.parent.name,
									})
								}
							})

							const fields =  Column.validate({column: {
									title: title,
									background: "#00c4fb",
									tasks: list
								}});

							commit(Mutation.ADD_ITEM, {fields: fields.column});
						})

						resolve()
					})
				})
			}
		}
	}
	getMutations()
	{
		return {
			[Mutation.ADD_ITEM]: (state, payload) =>
			{
				let item = this.getBaseItem();

				item = Object.assign(item, payload.fields);

				if (Type.isObject(item.tasks))
				{
					item.tasks.forEach((fields, index)=>{
						let task = Column.getTasksItem();
						task = Object.assign(task, fields);

						item.tasks[index] = task;
					})
				}

				state[Module.COLUMN].push(item);
				state[Module.COLUMN].forEach((item, index) => {
					item.sort = index + 1;
				});
			},
		}
	}

	getGetters()
	{
		return {

			getColumn: state =>
			{
				return state[Module.COLUMN];
			},
			getErrors: state =>
			{
				return state.errors;
			}
		}
	}
}
