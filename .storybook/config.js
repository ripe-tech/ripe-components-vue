import Vue from "vue";
import GlobalEvents from "vue-global-events";
import { configure } from "@storybook/vue";

import { install as RipeComponentsVue } from "../vue";

import "./styles.css";

Vue.use(RipeComponentsVue);
Vue.component("global-events", GlobalEvents);

Vue.prototype.$bus = new Vue();

const req = require.context("../vue", true, /\.stories\.js$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
