export default class Type
{
	static isObject(value)
	{
		return !!value && (typeof value === 'object' || typeof value === 'function');
	}
	static isArrayFilled(value)
	{
		return this.isArray(value) && value.length > 0;
	}
	static isArray(value)
	{
		return !Type.isNil(value) && Array.isArray(value);
	}
	static isNumber(value)
	{
		return !Number.isNaN(value) && typeof value === 'number';
	}

	static isNil(value)
	{
		return value === null || value === undefined;
	}

	static isString(value)
	{
		return typeof value === 'string';
	}
}