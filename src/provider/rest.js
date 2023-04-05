import axios from "axios";

export default class Rest
{
	#endpoint = 'https://kanban.ft24.ru/rest/';
	constructor(options)
	{
		const cmd = options.cmd;
		const params = {};
		const id = options.id ?? false;
		const filter = options.filter ?? false;
		const fields = options.fields ?? false;
		const order = options.order ?? false;

		if (id)
		{
			params.id = id
		}

		if (filter)
		{
			params.filter = filter
		}
		else if (fields)
		{
			params.fields = fields
		}

		if (order)
		{
			params.order = order
		}

		return axios({
			method: 'get',
			baseURL: this.#endpoint,
			url: cmd,
			params: params
		})
	}
}