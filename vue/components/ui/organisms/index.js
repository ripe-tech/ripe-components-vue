import { Details } from "./details/details.vue";
import { Header } from "./header/header.vue";
import { Listing } from "./listing/listing.vue";
import { SaveFilterModal } from "./listing/save-filter-modal.vue";

const install = Vue => {
    Vue.component("details-ripe", Details);
    Vue.component("header-ripe", Header);
    Vue.component("listing", Listing);
    Vue.component("save-filter-modal", SaveFilterModal);
};

export { Details, Header, Listing, SaveFilterModal };

export default install;
