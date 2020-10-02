import { Chat } from "./chat/chat.vue";
import { Details } from "./details/details.vue";
import { EntityLister } from "./entity-lister/entity-lister.vue";
import { Header } from "./header/header.vue";
import { Listing } from "./listing/listing.vue";
import { TableMenu } from "./table-menu/table-menu.vue";

const install = Vue => {
    Vue.component("chat", Chat);
    Vue.component("details-ripe", Details);
    Vue.component("entity-lister", EntityLister);
    Vue.component("header-ripe", Header);
    Vue.component("listing", Listing);
    Vue.component("table-menu", TableMenu);
};

export { Chat, Details, EntityLister, Header, Listing, TableMenu };

export default install;
