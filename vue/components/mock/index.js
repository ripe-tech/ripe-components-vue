import { RouterLink } from "./router-link/router-link.vue";

const install = Vue => {
    if (!Vue.options.components.RouterLink) {
        Vue.component("router-link", RouterLink);
    }
};

export { RouterLink };

export default install;
