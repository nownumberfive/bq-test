import 'primevue/resources/themes/md-light-indigo/theme.css'
import './assets/scss/main.scss'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/stores';
import toast from '@/plugins/toast';
import PrimeVue from 'primevue/config';
import { useAuthStore } from "@/stores/auth.store";
import { enableRouterGuards } from '@/router/guards';

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(toast)
app.use(PrimeVue)

useAuthStore()
	.restoreSession()
	.catch(() => {})

enableRouterGuards(router);

app.mount('#app')


