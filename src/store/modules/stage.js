import Type from "../../lib/type.js";
import Text from "../../lib/text.js";
import {Module} from "../../enum/module.js";
import {MutationTypes} from "../../enum/mutation-types.js";
import Rest from "../../provider/rest.js";
import RestHandler from "../../lib/rest-handler.js";
import KanbanShipmentRoute from "../../config/kanban-shipment-route.js";


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
			title: "",
			relationLinksCount: 0,
			commentsAttachesCount: 0,
			commentsCount: 0,
			unreadCommentsCount: 0,
			hidden: false,
			tags: [],
			responsible: Stage.getResponsibleItem(),
		};
	}

	static getTagsItem()
	{
		return {
			code: null,
			value: null,
			variant: 'elevated',
			size: 'x-small',
			color: false,
		};
	}

	static getResponsibleItem()
	{
		return {
			name: null,
			short: null,
			avatar: null,
			color: false,
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
			fields.tasks.forEach((item) => {
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

		if (Type.isNumber(fields.relationLinksCount) || Type.isString(fields.relationLinksCount))
		{
			result.relationLinksCount = Text.toNumber(fields.relationLinksCount);
		}

		if (Type.isNumber(fields.commentsAttachesCount) || Type.isString(fields.commentsAttachesCount))
		{
			result.commentsAttachesCount = Text.toNumber(fields.commentsAttachesCount);
		}

		if (Type.isNumber(fields.commentsCount) || Type.isString(fields.commentsCount))
		{
			result.commentsCount = Text.toNumber(fields.commentsCount);
		}

		if (Type.isNumber(fields.unreadCommentsCount) || Type.isString(fields.unreadCommentsCount))
		{
			result.unreadCommentsCount = Text.toNumber(fields.unreadCommentsCount);
		}

		if (Type.isBoolean(fields.hidden))
		{
			result.hidden = fields.hidden;
		}

		if (Type.isObject(fields.tags))
		{
			result.tags = [];
			fields.tags.forEach((item)=>{
				let fields = Stage.validateTag(item);
				result.tags.push(fields);
			})
		}

		if (Type.isObject(fields.responsible))
		{
			result.responsible = Stage.validateResponsible(fields.responsible);
		}

		return result;
	}

	static validateTag(fields)
	{
		const result = {};

		if (Type.isString(fields.code))
		{
			result.code = fields.code.toString();
		}

		if (Type.isString(fields.value))
		{
			result.value = fields.value.toString();
		}

		if (Type.isString(fields.variant))
		{
			result.variant = fields.variant.toString();
		}

		if (Type.isString(fields.size))
		{
			result.size = fields.size.toString();
		}

		if (Type.isString(fields.color))
		{
			result.color = fields.color.toString();
		}

		return result;
	}

	static validateResponsible(fields)
	{
		const result = {};

		if (Type.isString(fields.name))
		{
			result.name = fields.name.toString();
		}

		if (Type.isString(fields.short))
		{
			result.short = fields.short.toString();
		}

		if (Type.isString(fields.avatar))
		{
			result.avatar = fields.avatar.toString();
		}

		if (Type.isString(fields.color))
		{
			result.color = fields.color.toString();
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

					const filter = {};
					const likeName = 'kanbanName';
					filter[likeName] = KanbanShipmentRoute.getName();

					(new Rest({
						cmd,
						filter
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
				const cmd = 'task.task.update';

				return (new Rest({
					cmd,
					id: payload.id,
					fields: payload.fields
				}))
			},
			addComment(state, payload)
			{
				const cmd = 'task.comment.add';

				return (new Rest({
						cmd,
						fields: payload.fields
					}))
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
					item.tasks.forEach((fields, index) => {

						let tags = [];
						if (Type.isObject(fields.tags))
						{
							fields.tags.forEach((tagFields, tagIndex)=>{
								let tag = Stage.getTagsItem();
								tag = Object.assign(tag, tagFields);

								tags[tagIndex] = tag
							})

							fields.tags = tags;
						}

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
