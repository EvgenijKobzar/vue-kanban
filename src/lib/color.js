import Type from "./type.js";

export default class Color
{
	static stringToColour(str)
	{
		let colour = '#000';

		if (Type.isStringFilled(str) === false)
		{
			return colour;
		}

		let hash = 0;
		for (let i = 0; i < str.length; i++)
		{
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}

		colour = '#';
		for (let i = 0; i < 3; i++)
		{
			let value = (hash >> (i * 8)) & 0xFF;
			colour += ('00' + value.toString(16)).substr(-2);
		}
		return colour;
	}
}