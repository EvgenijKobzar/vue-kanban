import {Theme} from "../enum/color.js";

export default class ColorTheme
{
	static getTheme()
	{
		return true ? Theme.GREEN: Theme.BLUE;
	}
}