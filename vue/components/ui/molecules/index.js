import { Modal } from "./modal/modal.vue";

const install = Vue => {
    Vue.component("modal", Modal);
};

export { Modal };

export default install;
