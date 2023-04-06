import Type from "../../lib/type.js";
import Text from "../../lib/text.js";
import {Module} from "../../enum/module.js";
import {MutationTypes} from "../../enum/mutation-types.js";
import Rest from "../../provider/rest.js";
import {DateTime} from "luxon";
import RestHandler from "../../lib/rest-handler.js";


export default class Stage
{
	getName()
	{
		return Module.STAGE
	}
	getState()
	{
		return {
			stage: [],
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

		if (Type.isObject(fields.stage))
		{
			result.stage = Stage.validateStage(fields.stage);
		}

		return result;
	}

	static validateStage(fields)
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
				let fields = Stage.validateTasks(item);
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
			},
			updateTask(state, payload)
			{
				return new Promise((resolve, reject) =>
				{
					const cmd = 'task.task.update';

					(new Rest({
						cmd,
						id: payload.id,
						fields: payload.fields
					}))
				})
			}
		}
	}
	getMutations()
	{
		return {
			[MutationTypes.ADD_ITEM]: (state, payload) =>
			{
				payload.fields = Stage.validateStage(payload.fields);

				let item = this.getBaseItem();

				item = Object.assign(item, payload.fields);

				if (Type.isObject(item.tasks))
				{
					item.tasks.forEach((fields, index)=>{
						let task = Stage.getTasksItem();
						task = Object.assign(task, fields);

						item.tasks[index] = task;
					})
				}

				state[Module.STAGE].push(item);
				state[Module.STAGE].forEach((item, index) => {
					item.sort = index + 1;
				});
			},
			[MutationTypes.CLEAR]: (state) =>
			{
				state.stage = [];
			},
			[MutationTypes.UPD_ITEM]: (state, payload) =>
			{
				if (Type.isObject(payload.fields.tasks))
				{
					payload.fields.tasks.forEach((fields, index)=>{
						let item = Stage.getTasksItem();
						item = Object.assign(item, fields);

						payload.fields.tasks[index] = item;
					})
				}

				state.stage[payload.index] = Object.assign(
					state.stage[payload.index],
					payload.fields
				);
			}
		}
	}

	getGetters()
	{
		return {
			getStages: state =>
			{
				return state[Module.STAGE];
			},
			getStageByName: state => (name) =>
			{
				return state[Module.STAGE].find(stage => stage.title === name)
			},
			getStageIndexByName: state => (name) =>
			{
				return state[Module.STAGE].findIndex(stage => stage.title === name)
			},
			getErrors: state =>
			{
				return state.errors;
			}
		}
	}
}
