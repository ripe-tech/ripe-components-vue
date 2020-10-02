import { Chat } from "./chat/chat.vue";
import { Details } from "./details/details.vue";
import { EntityListing } from "./entity-listing/entity-listing.vue";
import { Header } from "./header/header.vue";
import { Listing } from "./listing/listing.vue";
import { TableMenu } from "./table-menu/table-menu.vue";

const install = Vue => {
    Vue.component("chat", Chat);
    Vue.component("details-ripe", Details);
    Vue.component("entity-listing", EntityListing);
    Vue.component("header-ripe", Header);
    Vue.component("listing", Listing);
    Vue.component("table-menu", TableMenu);
};

export { Chat, Details, EntityListing, Header, Listing, TableMenu };

export default install;
