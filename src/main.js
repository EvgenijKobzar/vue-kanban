import { createApp } from 'vue'

import Kanban from './application/kanban.vue';

// Vuex
import store from './store/index'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
	components,
	directives,
	icons: {
		defaultSet: 'mdi',
	},
})

createApp(Kanban).use(store).use(vuetify).mount('#kanban-app')
