import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

import router from '@/router';
import Loading from '@/directive/loading';
import i18n from '@/plugins/i18n';

import 'normalize.css/normalize.css';
import '@/styles/index.css';

import App from './App.vue';

const app = createApp(App);

app.directive('loading', Loading);

app.use(router);
app.use(VueQueryPlugin);
app.use(i18n);
app.mount('#app');

