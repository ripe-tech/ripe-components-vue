import { Chat } from "./chat/chat.vue";
import { Details } from "./details/details.vue";
import { EntityShow } from "./entity-show/entity-show.vue";
import { Header } from "./header/header.vue";
import { Listing } from "./listing/listing.vue";
import { TableMenu } from "./table-menu/table-menu.vue";

const install = Vue => {
    Vue.component("chat", Chat);
    Vue.component("details-ripe", Details);
    Vue.component("entity-show", EntityShow);
    Vue.component("header-ripe", Header);
    Vue.component("listing", Listing);
    Vue.component("table-menu", TableMenu);
};

export { Chat, Details, EntityShow, Header, Listing, TableMenu };

export default install;
