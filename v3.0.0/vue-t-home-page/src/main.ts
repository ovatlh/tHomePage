import { createApp } from "vue";

import { createPinia } from "pinia";

import OpenVue from "openvue/config";
import Aura from "@openvue/themes/aura";
import DialogService from "openvue/dialogservice";
import ToastService from "openvue/toastservice";
import { definePreset } from "@openvue/themes";

import App from "./App.vue";

import "./assets/style.css";
import "@openvue/openicons/openicons.css";

const AuraCustom = definePreset(Aura, {
	semantic: {
		primary: {
			50: "{neutral.50}",
			100: "{neutral.100}",
			200: "{neutral.200}",
			300: "{neutral.300}",
			400: "{neutral.400}",
			500: "{neutral.500}",
			600: "{neutral.600}",
			700: "{neutral.700}",
			800: "{neutral.800}",
			900: "{neutral.900}",
			950: "{neutral.950}",
		},
	},
});

const app = createApp(App);

app.use(createPinia());
app.use(OpenVue, {
	theme: {
		preset: AuraCustom,
		options: {
			darkModeSelector: ".app-dark",
		},
	},
});
app.use(DialogService);
app.use(ToastService);

app.mount("#app");
