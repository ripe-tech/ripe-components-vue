import Vue from "vue";
import GlobalEvents from "vue-global-events";

import { install as RipeComponentsVue } from "../vue";

import "./styles.css";

export const parameters = {
    layout: "fullscreen"
};

Vue.use(RipeComponentsVue);
Vue.component("global-events", GlobalEvents);

Vue.prototype.$bus = new Vue();
