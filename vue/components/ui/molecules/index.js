import { Alert } from "./alert/alert.vue";
import { Announcements } from "./announcements/announcements.vue";
import { ButtonIconAnimated } from "./button-icon-animated/button-icon-animated.vue";
import { ChatMessage } from "./chat-message/chat-message.vue";
import { Filter } from "./filter/filter.vue";
import { Footer } from "./footer/footer.vue";
import { FormInput } from "./form-input/form-input.vue";
import { InputCurrency } from "./input-currency/input-currency.vue";
import { InputSymbol } from "./input-symbol/input-symbol.vue";
import { Lightbox } from "./lightbox/lightbox.vue";
import { Lineup } from "./lineup/lineup.vue";
import { Modal } from "./modal/modal.vue";
import { ProgressBar } from "./progress-bar/progress-bar.vue";
import { Table } from "./table/table.vue";
import { Tabs } from "./tabs/tabs.vue";
import { TagGroup } from "./tag-group/tag-group.vue";
import { Search } from "./search/search.vue";
import { Select } from "./select/select.vue";
import { UploadArea } from "./upload-area/upload-area.vue";

const install = Vue => {
    Vue.component("alert", Alert);
    Vue.component("button-icon-animated", ButtonIconAnimated);
    Vue.component("announcements", Announcements);
    Vue.component("chat-message", ChatMessage);
    Vue.component("filter-ripe", Filter);
    Vue.component("footer-ripe", Footer);
    Vue.component("form-input", FormInput);
    Vue.component("input-currency", InputCurrency);
    Vue.component("input-symbol", InputSymbol);
    Vue.component("lightbox", Lightbox);
    Vue.component("lineup", Lineup);
    Vue.component("modal", Modal);
    Vue.component("progress-bar", ProgressBar);
    Vue.component("search", Search);
    Vue.component("select-ripe", Select);
    Vue.component("table-ripe", Table);
    Vue.component("tag-group", TagGroup);
    Vue.component("tabs", Tabs);
    Vue.component("upload-area", UploadArea);
};

export {
    Alert,
    Announcements,
    ButtonIconAnimated,
    ChatMessage,
    Filter,
    Footer,
    FormInput,
    InputCurrency,
    InputSymbol,
    Lightbox,
    Lineup,
    Modal,
    ProgressBar,
    Search,
    Select,
    Table,
    Tabs,
    TagGroup,
    UploadArea
};

export default install;
