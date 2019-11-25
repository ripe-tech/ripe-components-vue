import Vue from "vue";
import GlobalEvents from "vue-global-events";
import { configure } from "@storybook/vue";

import * as components from "../vue";

import "./styles.css";

for (let key in components) {
    Vue.component(key, components[key]);
}

Vue.component("global-events", GlobalEvents);
Vue.prototype.$bus = new Vue();
Vue.prototype.$device = null;

const req = require.context("../vue", true, /\.stories\.js$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
