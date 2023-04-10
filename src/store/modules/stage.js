import Type from "../../lib/type.js";
import Text from "../../lib/text.js";
import {Module} from "../../enum/module.js";
import {MutationTypes} from "../../enum/mutation-types.js";
import Rest from "../../provider/rest.js";
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
			title: "",
			commentsAttachesCount: "",
			commentsCount: "",
			unreadCommentsCount: "",
			hidden: false,
			tags: [],
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
				let fields = Stage.validateTags(item);
				result.tags.push(fields);
			})
		}

		return result;
	}

	static validateTags(fields)
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
					const likeName = '%name';
					filter[likeName] = RestHandler.getPrefixFilterTaskName();

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
			getTaskListByTags: state => (tags) =>
			{
				const result = [];

				state[Module.STAGE].forEach((stage) => {

					const tasksByTag = [];
					stage.tasks.forEach((task) => {

						let tagFound = false;
						task.tags.forEach((tag) => {
							tags.forEach((stateTag) => {
								if( stateTag.code === tag.code && stateTag.value === tag.value)
								{
									tagFound = true;
								}
							})
						})

						if (tagFound)
						{
							tasksByTag.push(task)
						}
					})

					result.push({
						sort: stage.sort,
						title: stage.title,
						background: stage.background,
						tasks: tasksByTag,
					})
				})
				console.log('result', result)
				return result
			},
			getErrors: state =>
			{
				return state.errors;
			}
		}
	}
}
