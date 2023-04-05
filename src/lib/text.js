import Type from "./type.js";

export default class Text
{
	static toNumber(value)
	{
		const parsedValue = Number.parseFloat(value);

		if (Type.isNumber(parsedValue))
		{
			return parsedValue;
		}

		return 0;
	}
}