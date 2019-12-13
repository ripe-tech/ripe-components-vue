import { Alert } from "./alert/alert.vue";
import { Modal } from "./modal/modal.vue";

const install = Vue => {
    Vue.component("alert", Alert);
    Vue.component("modal", Modal);
};

export { Alert, Modal };

export default install;
