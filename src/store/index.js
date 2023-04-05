import { createStore } from 'vuex'
import Column from "./modules/column.js";

const Module = new Column();

export default createStore({
	modules: {
		[Module.getName()]: {
			state: Module.getState(),
			getters: Module.getGetters(),
			actions: Module.getActions(),
			mutations: Module.getMutations(),
		}
	},
})









