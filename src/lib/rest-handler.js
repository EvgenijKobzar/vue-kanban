import {MutationTypes} from "../enum/mutation-types.js";
import Column from "../store/modules/column.js";
import {StageColor, StageColorPack} from "../enum/stage-color.js";
import Type from "./type.js";

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
		this.#refresh(r)
	}

	handleTaskTaskListError(r)
	{

	}

	#refresh(r)
	{
		this.state.commit(MutationTypes.CLEAR);

		const uniq = this.#getUniqColumns(r.tasks)
		const columns = this.#createColumnCollection(uniq)

		columns.forEach((column) => {

			column.tasks = this.#getTaskListByColum(r.tasks, column)

			this.state.commit(MutationTypes.ADD_ITEM, { fields: column });
		})
	}

	#createColumnCollection(items)
	{
		const columns = [];
		const firstInx = 0;
		const lastInx = items.length-1;
		let pack = [];

		items.forEach((title, inx) => {

			if (Type.isArrayFilled(pack) === false)
			{
				pack = Object.values(StageColorPack)
			}

			let background = pack.shift();

			columns.push({
				title: title,
				background: inx === firstInx
					? StageColor.FIRST
					: inx === lastInx
						? StageColor.LAST
						: background
			})
		})

		return columns;
	}

	#getUniqColumns(items)
	{
		const result = [];

		items.forEach((item) => {
			if (item?.Category130CustomFieldStatus)
			{
				result.push(item.Category130CustomFieldStatus)
			}
		})

		return  [ ...new Set(result) ];
	}

	#getTaskListByColum(items, column)
	{
		const result = [];

		items.forEach((item) => {
			if( column.title === item?.Category130CustomFieldStatus)
			{
				result.push({
					id: item.id,
					title: item.name,
					date: item.timeCreated.value,
					type: item.parent.name,
				})
			}
		})

		return result;
	}
}