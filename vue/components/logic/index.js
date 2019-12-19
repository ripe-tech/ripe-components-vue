import { Global } from "./global/global.vue";

const install = Vue => {
    Vue.component("global", Global);
};

export { Global };

export default install;
