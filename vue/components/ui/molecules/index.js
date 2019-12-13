import { Alert } from "./ui/alert/alert.vue";
import { Footer } from "./footer/footer.vue";
import { FormInput } from "./form-input/form-input.vue";
import { Modal } from "./modal/modal.vue";
import { ProgressBar } from "./progress-bar/progress-bar.vue";
import { Search } from "./search/search.vue";

const install = Vue => {
    Vue.component("alert", Alert);
    Vue.component("footer-ripe", Footer);
    Vue.component("form-input", FormInput);
    Vue.component("modal", Modal);
    Vue.component("progress-bar", ProgressBar);
    Vue.component("search", Search);
};

export { Alert, Footer, FormInput, Modal, ProgressBar, Search };

export default install;
