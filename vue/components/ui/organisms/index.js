import { Details } from "./details/details.vue";
import { InputSymbol } from "./input-symbol/input-symbol.vue";
import { Header } from "./header/header.vue";
import { Listing } from "./listing/listing.vue";

const install = Vue => {
    Vue.component("details-ripe", Details);
    Vue.component("input-symbol", InputSymbol);
    Vue.component("header-ripe", Header);
    Vue.component("listing", Listing);
};

export { Details, InputSymbol, Header, Listing };

export default install;
