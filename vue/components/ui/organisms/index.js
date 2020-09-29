import { Chat } from "./chat/chat.vue";
import { Details } from "./details/details.vue";
import { EntityEditor } from "./entity-editor/entity-editor.vue";
import { Form } from "./form/form.vue";
import { Header } from "./header/header.vue";
import { Listing } from "./listing/listing.vue";
import { TableMenu } from "./table-menu/table-menu.vue";

const install = Vue => {
    Vue.component("chat", Chat);
    Vue.component("details-ripe", Details);
    Vue.component("entity-editor", EntityEditor);
    Vue.component("form-ripe", Form);
    Vue.component("header-ripe", Header);
    Vue.component("listing", Listing);
    Vue.component("table-menu", TableMenu);
};

export { Chat, Details, EntityEditor, Form, Header, Listing, TableMenu };

export default install;
