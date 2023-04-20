import {MutationTypes} from "../enum/mutation-types.js";
import {StageColor, Pack} from "../enum/color.js";
import Type from "./type.js";
import ColorTheme from "./color-theme.js";
import Color from "./color.js";
import {DateTime} from "luxon";
import KanbanShipmentRoute from "../config/kanban-shipment-route.js";

export default class RestHandler
{

	constructor(options)
	{
		this.state = options.state
	}
	execute( command, result, extra = {})
	{
		command = 'handle'+command.split('.').map(element => {
			return element.charAt(0).toUpperCase() + element.slice(1);
		}).join('');

		if (result.error)
		{
			if (typeof this[command+'Error'] === 'function')
			{
				return this[command+'Error'](result.error, extra);
			}
		}
		else
		{
			if (typeof this[command+'Success'] === 'function')
			{
				return this[command+'Success'](result.data, extra);
			}
		}

		return typeof this[command] === 'function'? this[command](result, extra): null;
	}

	handleTaskTaskListSuccess(r)
	{
		this.refresh(r)
	}

	handleTaskTaskListError(r)
	{

	}

	refresh(r)
	{
		this.state.commit(MutationTypes.CLEAR);

		// const uniq = this.#getUniqStages(r.tasks)
		const uniq = KanbanShipmentRoute.getStageList();

		const stages = RestHandler.createStageCollection(uniq)

		stages.forEach((stage) => {

			stage.tasks = RestHandler.getTaskListByStageName(r.tasks, stage.title)

			this.state.commit(MutationTypes.ADD_ITEM, { fields: stage });
		})
	}

	static createStageCollection(items)
	{
		const stages = [];
		const firstInx = 0;
		const lastInx = items.length-1;
		let pack = [];

		items.forEach((item, inx) => {

			if (Type.isArrayFilled(pack) === false)
			{
				pack = Object.values(Pack)
			}

			let background = pack.shift();

			stages.push({
				title: item.title,
				dialog: item.dialog,
				background: inx === firstInx
					? StageColor.FIRST
					: inx === lastInx
						? StageColor.LAST
						: background
			})
		})

		return stages;
	}

	#getUniqStages(items)
	{
		const result = [];

		items.forEach((item) => {
			if (item?.customFieldStatus)
			{
				result.push(item.customFieldStatus)
			}
		})

		return  [ ...new Set(result) ];
	}

	static getTaskListByStageName(items, name)
	{
		const result = [];

		items.forEach((item) => {
			if( name === item?.customFieldStatus)
			{
				result.push({
					id: item.id,
					title: item.name,
					relationLinksCount: item.relationLinksCount,
					commentsAttachesCount: item.commentsAttachesCount,
					commentsCount: item.commentsCount,
					unreadCommentsCount: item.unreadCommentsCount,
					tags: RestHandler.internalizeTagList(item.tags),
					responsible: RestHandler.internalizeResponsible(item.responsible),
				})
			}
		})

		return result;
	}

	static internalizeTagList(items)
	{
		const result = [];

		items.forEach((item) => {
			if (item.code === 'timeCreated')
			{
				const date = DateTime.fromISO(item.value).toLocaleString(DateTime.DATE_MED)

				result.push({
					code: item.code,
					value: date.split(' ')[0].toString()
						+ ' '
						+	date.split(' ')[1].toString().replace('.', ''),
					variant: 'outlined',
					color: ColorTheme.getTheme().PRIMARY,
				})
			}
			else if(item.code === 'parentName')
			{
				result.push({
					code: item.code,
					value: item?.value,

					color: ColorTheme.getTheme().SECONDARY,
				})
			}
			else
			{
				result.push({
					code: item.code,
					value: item?.value,
					color: Color.stringToColour(item?.value),
				})
			}
		})

		return result;
	}

	static internalizeResponsible(item)
	{
		return {
			name: item.name,
			short: item.name.split(' ')[0][0] + item.name.split(' ')[1][0].toUpperCase(),
			avatar: item.avatar.replace('{width}', 100).replace('{height}', 100),
			color: Color.stringToColour(item.name),
		}
	}
}