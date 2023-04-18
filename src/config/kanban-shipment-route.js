import {DialogFieldTypes} from "../enum/dialog-field-types.js";

export default class KanbanShipmentRoute
{
	static getName()
	{
		return 'АТ-Заявки'
	}

	static getStageList()
	{
		return [
			{
				title: "Новые",
				dialog: {},
			},
			{
				title: "К перевозке (транспорт)",
				dialog: {
					subheaders: [{
						title: 'Информация для водителя',
						fields: [
							{name: 'Вся сумма', type: DialogFieldTypes.MONEY_RUB},
							{name: 'Проходы', type: DialogFieldTypes.SELECT, variant: [
								'Не требуются', 'Оплачивает Заказчик', 'Оплачивает Перевозчик']},
						]
					},
						{
							title: 'Заявка',
							fields: [
								{name: 'Ссылка в 4Logistic', type: DialogFieldTypes.TEXT,},
								{name: 'Водителю заявка отправлена в чат', type: DialogFieldTypes.SELECT, variant: ['Отправлена', 'Нет']},
							]
						}
					],
				}
			},
			{
				title: "Выполнено (транспорт)",
				dialog: {},
			},
			{
				title: "Счета (бухгалтерия)",
				dialog: {
					subheaders: [{
						title: 'Информация для выставления счетов бухгалтерией и дальнейшего их согласования',
						fields: [
							{name: 'Клиент (ссылка в 4Logistic или Мегаплан)', type: DialogFieldTypes.TEXT},
							{name: 'Итоговая сумма для выставления счета', type: DialogFieldTypes.MONEY_RUB},
							{name: 'Дополнительная информация для выставления счета', type: DialogFieldTypes.TEXTAREA},
						]
					},
						{
							title: 'Расчет ЗП для водителя',
							fields: [
								{name: 'Сумма для расчета ЗП', type: DialogFieldTypes.MONEY_RUB},
								{name: 'Какие суммы не входят в стоимость фрахта для расчета ЗП', type: DialogFieldTypes.TEXTAREA},
							]
						}],
				}
			},
			{
				title: "Выставлены (бухгалтерия)",
				dialog: {
					subheaders: [{
						title: 'Выставление счетов для согласования',
						fields: [
							{name: 'Акт и счет прикреплены к задаче', type: DialogFieldTypes.CHECKBOX},
						]
					}]
				},
			},
			{
				title: "На согласование (менеджер)",
				dialog: {},
			},
			{
				title: "На отправке (бухгалтерия)",
				dialog: {},
			},
			{
				title: "Отправлены (бухгалтерия)",
				dialog: {
					subheaders: [{
						title: "Отправка документов",
						fields: [
							{name: 'курьерская служба', type: 'text'},
							{name: 'трек', type: 'text'},
							{name: 'отвозим сами', type: 'checkbox'},
						],
					},
						{
							title: "Архивация",
							fields: [
								{name: 'номер в архиве', type: 'text'},
							],
						}],
				},
			},
			{
				title: "Сделано",
				dialog: {},
			},
		]
	}
}