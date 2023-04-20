import {describe, expect, it } from 'vitest'
import RestHandler from "./rest-handler.js";
import KanbanShipmentRoute from "../config/kanban-shipment-route.js";
import {StageColor} from "../enum/color.js";

const responsibleFrom = {
	name: 'Кобзарь Евгений',
	avatar: '//pc31.megaplan.ru/hosts/auroralogistic.megaplan.ru/{width}x{height}/attach/SdfFileM_File/File/25/afe47c503483e11bae50305bddaa448d.png'
};
const responsibleTo = {
	name: "Кобзарь Евгений",
	short: "КЕ",
	avatar: "//pc31.megaplan.ru/hosts/auroralogistic.megaplan.ru/100x100/attach/SdfFileM_File/File/25/afe47c503483e11bae50305bddaa448d.png",
	color: "#11a768"
};

const stageStatus = "Новые";
const tagsFrom = [
	{code: "parentName", value: "test"},
	{code: "timeCreated", value: "2023-04-13T18:41:54+00:00"},
	{code: "сustomFieldTyagach", value: "M864KT 39"}
];
const tagsTo = [
	{code: "parentName", value: "test", color: "grey-lighten-2"},
	{code: "timeCreated", value: "13 апр", color: "green-lighten-1", variant: "outlined"},
	{code: "сustomFieldTyagach", value: "M864KT 39", color: "#94446b"}
];

const taskListFrom = [{
	id: "1001317",
	name: "Тестовая заявка",
	timeCreated: "2023-04-13T18:41:54+00:00",
	commentsAttachesCount: 0,
	relationLinksCount: 0,
	commentsCount: 1,
	unreadCommentsCount: null,
	responsible: responsibleFrom,
	customFieldStatus: stageStatus,
	tags: tagsFrom,
}]
const taskListTo = [{
	id: "1001317",
	title: "Тестовая заявка",
	commentsAttachesCount: 0,
	relationLinksCount: 0,
	commentsCount: 1,
	unreadCommentsCount: null,
	responsible: responsibleTo,
	tags: tagsTo,
}]

describe("RestHandler", () => {
	it("import without error",
		() => {
			expect(RestHandler).toBeDefined();
			expect(typeof RestHandler).toBe("function");
		});
	it('internalize Responsible', () => {
		expect(RestHandler.internalizeResponsible(responsibleFrom)).toEqual(responsibleTo);
	});
	it('internalize TagList', () => {
		expect(RestHandler.internalizeTagList(tagsFrom)).toEqual(tagsTo);
	});
	it('internalize TaskList', () => {
		expect(RestHandler.getTaskListByStageName(taskListFrom, stageStatus)).toEqual(taskListTo);
	});
	it('stage List - StageColor.FIRST', () => {
		const uniq = KanbanShipmentRoute.getStageList();
		const stages = RestHandler.createStageCollection(uniq);
		expect(stages[0].background).toBe(StageColor.FIRST)
	});
	it('stage List - StageColor.LAST', () => {
		const uniq = KanbanShipmentRoute.getStageList();
		const stages = RestHandler.createStageCollection(uniq);
		expect(stages[8].background).toBe(StageColor.LAST)
	});
})