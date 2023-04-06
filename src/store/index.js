import { createStore } from 'vuex'
import Stage from "./modules/stage.js";

const Module = new Stage();

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









