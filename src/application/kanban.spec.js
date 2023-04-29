import { afterEach, describe, it, expect, vi} from "vitest";
import { mount } from "@vue/test-utils"
import flushPromises from 'flush-promises'
import component from "./kanban.vue";

import { createVuetify } from 'vuetify'
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"


import { createStore } from 'vuex'
import Stage from "../store/modules/stage";

const Module = new Stage();
const actions = Module.getActions();

vi.spyOn(actions, 'init')

const store = createStore({
	modules: {
		[Module.getName()]: {
			state: Module.getState(),
			getters: Module.getGetters(),
			actions,
			mutations: Module.getMutations(),
		}
	},
})


describe('Stage list ', () => {

	afterEach(() => {
		vi.resetAllMocks()
	})

	const vuetify = createVuetify({ components, directives })
	it('mounts without errors', () => {
		const view = mount(component, {global: {plugins: [vuetify, store]},})
		expect(view).toBeDefined();
		expect(actions.init).toHaveBeenCalledOnce();
	});
	it('Action Init - Called Once', async () => {
		const wrapper = mount(component, {global: {plugins: [vuetify, store]},})
		await flushPromises()
		await wrapper.vm.$nextTick()
		console.log(wrapper.html());
		expect(actions.init).toHaveBeenCalledOnce();
	})
})