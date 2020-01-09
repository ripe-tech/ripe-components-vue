import { Details } from "./details/details.vue";
import { Header } from "./header/header.vue";
import { Listing } from "./listing/listing.vue";

const install = Vue => {
    Vue.component("details-ripe", Details);
    Vue.component("header-ripe", Header);
    Vue.component("listing", Listing);
};


export default install;
