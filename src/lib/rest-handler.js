import {MutationTypes} from "../enum/mutation-types.js";
import Column from "../store/modules/column.js";

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
		const result = []
		const uniq = this.#getUniqColumns(r.tasks)

		uniq.forEach((title) => {
			result.push(this.#getTaskListByColum(r.tasks, title))
		})

		result.forEach((item) => {

			this.state.commit(MutationTypes.ADD_ITEM, {
				fields: {
					column: {
						title: item.title,
						background: "#00c4fb",
						tasks: item.tasks
					}
				}
			});
		})
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

		return [ ...new Set(result) ];
	}

	#getTaskListByColum(items, title)
	{
		const result = [];

		items.forEach((item) => {
			if( title === item?.Category130CustomFieldStatus)
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