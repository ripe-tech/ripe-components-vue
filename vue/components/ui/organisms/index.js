import { Details } from "./details/details.vue";
import { InputSymbol } from "./input-symbol/input-symbol.vue";
import { Header } from "./header/header.vue";
import { Listing } from "./listing/listing.vue";
import { TableMenu } from "./table-menu/table-menu.vue";

const install = Vue => {
    Vue.component("details-ripe", Details);
    Vue.component("input-symbol", InputSymbol);
    Vue.component("header-ripe", Header);
    Vue.component("listing", Listing);
    Vue.component("table-menu", TableMenu);
};

export { Details, InputSymbol, Header, Listing, TableMenu };

export default install;
