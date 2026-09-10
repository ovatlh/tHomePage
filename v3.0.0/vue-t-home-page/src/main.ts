import { createApp } from "vue";
import { createPinia } from "pinia";
import OpenVue from "openvue/config";

import App from "./App.vue";

import "./assets/style.css";
import "@openvue/openicons/openicons.css";

const app = createApp(App);

app.use(createPinia());
app.use(OpenVue, { unstyled: true });

app.mount("#app");
