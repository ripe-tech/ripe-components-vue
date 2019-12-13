import { Alert } from "./alert/alert.vue";
import { Filter } from "./filter/filter.vue";
import { Footer } from "./footer/footer.vue";
import { FormInput } from "./form-input/form-input.vue";
import { Lightbox } from "./lightbox/lightbox.vue";
import { Lineup } from "./lineup/lineup.vue";
import { Modal } from "./modal/modal.vue";
import { ProgressBar } from "./progress-bar/progress-bar.vue";
import { Table } from "./table/table.vue";
import { Tabs } from "./tabs/tabs.vue";
import { Search } from "./search/search.vue";
import { Select } from "./select/select.vue";

const install = Vue => {
    Vue.component("alert", Alert);
    Vue.component("filter-ripe", Filter);
    Vue.component("footer-ripe", Footer);
    Vue.component("form-input", FormInput);
    Vue.component("lightbox", Lightbox);
    Vue.component("lineup", Lineup);
    Vue.component("modal", Modal);
    Vue.component("progress-bar", ProgressBar);
    Vue.component("search", Search);
    Vue.component("select-ripe", Select);
    Vue.component("table-ripe", Table);
    Vue.component("tabs", Tabs);
};

export {
    Alert,
    Filter,
    Footer,
    FormInput,
    Lightbox,
    Lineup,
    Modal,
    ProgressBar,
    Search,
    Select,
    Table,
    Tabs
};

export default install;
