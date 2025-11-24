import { createApp } from "vue";
import router from "@/router";

import "normalize.css/normalize.css";
import "@/styles/index.css";

import App from "./App.vue";

createApp(App).use(router).mount("#app");
