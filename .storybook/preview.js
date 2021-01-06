import Vue from "vue";
import GlobalEvents from "vue-global-events";

import { install as RipeComponentsVue } from "../vue";

import "./styles.css";

Vue.use(RipeComponentsVue);
Vue.component("global-events", GlobalEvents);

Vue.prototype.$bus = new Vue();

export const parameters = { layout: 'fullscreen' }