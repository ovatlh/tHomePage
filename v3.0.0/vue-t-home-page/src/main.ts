import { createApp } from "vue";

import { createPinia } from "pinia";

import OpenVue from "openvue/config";
import Aura from "@openvue/themes/aura";
import DialogService from "openvue/dialogservice";
import ToastService from "openvue/toastservice";

import App from "./App.vue";

import "./assets/style.css";
import "@openvue/openicons/openicons.css";

const app = createApp(App);

app.use(createPinia());
app.use(OpenVue, {
	theme: {
		preset: Aura,
		options: {
			darkModeSelector: ".app-dark",
		},
	},
});
app.use(DialogService);
app.use(ToastService);

app.mount("#app");
