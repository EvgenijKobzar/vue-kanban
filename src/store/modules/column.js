import Type from "../../lib/type.js";
import Text from "../../lib/text.js";
import {Module} from "../../enum/module.js";
import {MutationTypes} from "../../enum/mutation-types.js";
import Rest from "../../provider/rest.js";
import {DateTime} from "luxon";
import RestHandler from "../../lib/rest-handler.js";


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
			init(state)
			{
				return new Promise((resolve, reject) =>
				{
					const cmd = 'task.task.list';
					const handler = new RestHandler({ state });

					(new Rest({
						cmd
					}))
					.then((result) => {
						handler.execute(cmd, result);
						resolve()
					})
					.catch((result) => handler.execute(cmd, {error: result.errors}));
				})
			}
		}
	}
	getMutations()
	{
		return {
			[MutationTypes.ADD_ITEM]: (state, payload) =>
			{
				payload.fields = Column.validateColumn(payload.fields);

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
