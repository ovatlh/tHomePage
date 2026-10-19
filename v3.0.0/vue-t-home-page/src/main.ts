import { createApp } from "vue";

import { createPinia } from "pinia";

import OpenVue from "openvue/config";
import { definePreset } from "@openvue/themes";
import Aura from "@openvue/themes/aura";
import DialogService from "openvue/dialogservice";
import ToastService from "openvue/toastservice";

import Button from "openvue/button";
import InputText from "openvue/InputText";
import FloatLabel from "openvue/FloatLabel";
import DynamicDialog from "openvue/DynamicDialog";
import Toast from "openvue/Toast";
import Form from "@openvue/forms/form";
import FormField from "@openvue/forms/formfield";
import Message from "openvue/message";
import InputNumber from "openvue/inputnumber";
import Checkbox from "openvue/checkbox";
import Select from "openvue/select";
import Fieldset from "openvue/fieldset";
import FileUpload from "openvue/fileupload";
import SelectButton from "openvue/selectbutton";

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

app.component("Button", Button);
app.component("InputText", InputText);
app.component("FloatLabel", FloatLabel);
app.component("DynamicDialog", DynamicDialog);
app.component("Toast", Toast);
app.component("Form", Form);
app.component("FormField", FormField);
app.component("Message", Message);
app.component("InputNumber", InputNumber);
app.component("Checkbox", Checkbox);
app.component("Select", Select);
app.component("Fieldset", Fieldset);
app.component("FileUpload", FileUpload);
app.component("SelectButton", SelectButton);

app.mount("#app");
