import Vue from "vue";
import Vuex from "vuex";
import GlobalEvents from "vue-global-events";

import { install as RipeComponentsVue } from "../vue";

import "./styles.css";

export const parameters = {
    layout: "fullscreen"
};

// makes use of Vuex to make use of things like
// data store (for some of the components)
Vue.use(Vuex);

Vue.use(RipeComponentsVue);
Vue.component("global-events", GlobalEvents);

Vue.prototype.$bus = new Vue();
