import { Alert } from "./alert/alert.vue";
import { Announcements } from "./announcements/announcements.vue";
import { ButtonDropdown } from "./button-dropdown/button-dropdown.vue";
import { ButtonIconAnimated } from "./button-icon-animated/button-icon-animated.vue";
import { ChatMessage } from "./chat-message/chat-message.vue";
import { CheckboxGroup } from "./checkbox-group/checkbox-group.vue";
import { ContainerMenu } from "./container-menu/container-menu.vue";
import { Filter } from "./filter/filter.vue";
import { Footer } from "./footer/footer.vue";
import { FormInput } from "./form-input/form-input.vue";
import { InputCurrency } from "./input-currency/input-currency.vue";
import { InputSymbol } from "./input-symbol/input-symbol.vue";
import { Lightbox } from "./lightbox/lightbox.vue";
import { Lineup } from "./lineup/lineup.vue";
import { Modal } from "./modal/modal.vue";
import { NotificationMessage } from "./notification-message/notification-message.vue";
import { ProgressBar } from "./progress-bar/progress-bar.vue";
import { RadioGroup } from "./radio-group/radio-group.vue";
import { Search } from "./search/search.vue";
import { Select } from "./select/select.vue";
import { SelectList } from "./select-list/select-list.vue";
import { Table } from "./table/table.vue";
import { Tabs } from "./tabs/tabs.vue";
import { TransferList } from "./transfer-list/transfer-list.vue";
import { UploadArea } from "./upload-area/upload-area.vue";

const install = Vue => {
    Vue.component("alert", Alert);
    Vue.component("button-dropdown", ButtonDropdown);
    Vue.component("button-icon-animated", ButtonIconAnimated);
    Vue.component("announcements", Announcements);
    Vue.component("chat-message", ChatMessage);
    Vue.component("checkbox-group", CheckboxGroup);
    Vue.component("container-menu", ContainerMenu);
    Vue.component("filter-ripe", Filter);
    Vue.component("footer-ripe", Footer);
    Vue.component("form-input", FormInput);
    Vue.component("input-currency", InputCurrency);
    Vue.component("input-symbol", InputSymbol);
    Vue.component("lightbox", Lightbox);
    Vue.component("lineup", Lineup);
    Vue.component("modal", Modal);
    Vue.component("notification-message", NotificationMessage);
    Vue.component("progress-bar", ProgressBar);
    Vue.component("radio-group", RadioGroup);
    Vue.component("search", Search);
    Vue.component("select-ripe", Select);
    Vue.component("select-list", SelectList);
    Vue.component("table-ripe", Table);
    Vue.component("tabs", Tabs);
    Vue.component("transfer-list", TransferList);
    Vue.component("upload-area", UploadArea);
};

export {
    Alert,
    Announcements,
    ButtonDropdown,
    ButtonIconAnimated,
    ChatMessage,
    CheckboxGroup,
    ContainerMenu,
    Filter,
    Footer,
    FormInput,
    InputCurrency,
    InputSymbol,
    Lightbox,
    Lineup,
    Modal,
    NotificationMessage,
    ProgressBar,
    RadioGroup,
    Search,
    Select,
    SelectList,
    Table,
    Tabs,
    TransferList,
    UploadArea
};

export default install;
