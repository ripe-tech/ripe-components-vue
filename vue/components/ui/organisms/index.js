import { Chat } from "./chat/chat.vue";
import { Details } from "./details/details.vue";
import { EntityShower } from "./entity-shower/entity-shower.vue";
import { Header } from "./header/header.vue";
import { Listing } from "./listing/listing.vue";
import { TableMenu } from "./table-menu/table-menu.vue";

const install = Vue => {
    Vue.component("chat", Chat);
    Vue.component("details-ripe", Details);
    Vue.component("entity-shower", EntityShower);
    Vue.component("header-ripe", Header);
    Vue.component("listing", Listing);
    Vue.component("table-menu", TableMenu);
};

export { Chat, Details, EntityShower, Header, Listing, TableMenu };

export default install;
