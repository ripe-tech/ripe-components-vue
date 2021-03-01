import { Chat } from "./chat/chat.vue";
import { Details } from "./details/details.vue";
import { EntityList } from "./entity-list/entity-list.vue";
import { EntityShow } from "./entity-show/entity-show.vue";
import { Form } from "./form/form.vue";
import { Header } from "./header/header.vue";
import { InputList } from "./input-list/input-list.vue";
import { Listing } from "./listing/listing.vue";
import { TableMenu } from "./table-menu/table-menu.vue";

const install = Vue => {
    Vue.component("chat", Chat);
    Vue.component("details-ripe", Details);
    Vue.component("entity-list", EntityList);
    Vue.component("entity-show", EntityShow);
    Vue.component("form-ripe", Form);
    Vue.component("header-ripe", Header);
    Vue.component("input-list", InputList);
    Vue.component("listing", Listing);
    Vue.component("table-menu", TableMenu);
};

export { Chat, Details, EntityList, EntityShow, Form, Header, Listing, TableMenu };

export default install;
