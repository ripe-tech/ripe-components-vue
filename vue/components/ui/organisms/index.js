import { ButtonGroup } from "./button-group/button-group.vue";
import { Chat } from "./chat/chat.vue";
import { ContainerForm } from "./container-form/container-form.vue";
import { Details } from "./details/details.vue";
import { EntityCreate } from "./entity-create/entity-create.vue";
import { EntityEdit } from "./entity-edit/entity-edit.vue";
import { EntityList } from "./entity-list/entity-list.vue";
import { EntityShow } from "./entity-show/entity-show.vue";
import { Form } from "./form/form.vue";
import { Header } from "./header/header.vue";
import { InputList } from "./input-list/input-list.vue";
import { Listing } from "./listing/listing.vue";
import { TableMenu } from "./table-menu/table-menu.vue";

const install = Vue => {
    Vue.component("button-group", ButtonGroup);
    Vue.component("chat", Chat);
    Vue.component("container-form", ContainerForm);
    Vue.component("details-ripe", Details);
    Vue.component("entity-create", EntityCreate);
    Vue.component("entity-edit", EntityEdit);
    Vue.component("entity-list", EntityList);
    Vue.component("entity-show", EntityShow);
    Vue.component("form-ripe", Form);
    Vue.component("header-ripe", Header);
    Vue.component("input-list", InputList);
    Vue.component("listing", Listing);
    Vue.component("table-menu", TableMenu);
};

export {
    ButtonGroup,
    Chat,
    ContainerForm,
    Details,
    EntityCreate,
    EntityEdit,
    EntityList,
    EntityShow,
    Form,
    Header,
    Listing,
    TableMenu
};

export default install;
