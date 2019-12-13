import { Alert } from "./ui/alert/alert.vue";
import { ProgressBar } from "./progress-bar/progress-bar.vue";
import { Footer } from "./footer/footer.vue";
import { FormInput } from "./form-input/form-input.vue";
import { Search } from "./search/search.vue";

const install = Vue => {
    Vue.component("alert", Alert);
    Vue.component("progress-bar", ProgressBar);
    Vue.component("footer-ripe", Footer);
    Vue.component("form-input", FormInput);
    Vue.component("search", Search);
};

export { Alert, ProgressBar, Footer, FormInput, Search };

export default install;
