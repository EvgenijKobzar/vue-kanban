import { describe, it, expect} from "vitest";
import { mount } from "@vue/test-utils"
// import component from "./kanban.vue";
import component from "../views/elements/plus.vue";


import { createVuetify } from 'vuetify'
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"


describe('Stage list ', () => {
	const vuetify = createVuetify({ components, directives })
	it('mounts without errors', () => {
		const view = mount(component, {global: {plugins: [vuetify]},})
		// console.log(view.html())
		expect(view).toBeDefined()
	})
})