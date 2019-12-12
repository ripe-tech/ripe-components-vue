import { RouterLink } from "./mock/router-link/router-link.vue";
import { ErrorPlatforme } from "./parts/error-platforme/error-platforme.vue";
import { Global } from "./parts/global/global.vue";
import { OAuth } from "./parts/oauth/oauth.vue";
import { Alert } from "./ui/alert/alert.vue";
import { ButtonColor } from "./ui/button-color/button-color.vue";
import { ButtonIcon } from "./ui/button-icon/button-icon.vue";
import { ButtonPlatforme } from "./ui/button-platforme/button-platforme.vue";
import { Checkbox } from "./ui/checkbox/checkbox.vue";
import { Container } from "./ui/container/container.vue";
import { Details } from "./ui/details/details.vue";
import { Dropdown } from "./ui/dropdown/dropdown.vue";
import { Filter } from "./ui/filter/filter.vue";
import { FooterPlatforme } from "./ui/footer/footer.vue";
import { FormInput } from "./ui/form-input/form-input.vue";
import { Header } from "./ui/header/header.vue";
import { Image } from "./ui/image/image.vue";
import { Input } from "./ui/input/input.vue";
import { Label } from "./ui/label/label.vue";
import { Lightbox } from "./ui/lightbox/lightbox.vue";
import { Lineup } from "./ui/lineup/lineup.vue";
import { Link } from "./ui/link/link.vue";
import { Listing } from "./ui/listing/listing.vue";
import { loader } from "./ui/loader/loader.vue";
import { Modal } from "./ui/modal/modal.vue";
import { Overlay } from "./ui/overlay/overlay.vue";
import { ProgressBar } from "./ui/progress-bar/progress-bar.vue";
import { Radio } from "./ui/radio/radio.vue";
import { Search } from "./ui/search/search.vue";
import { Side } from "./ui/side/side.vue";
import { Table } from "./ui/table/table.vue";
import { Tabs } from "./ui/tabs/tabs.vue";
import { Tag } from "./ui/tag/tag.vue";
import { Textarea } from "./ui/textarea/textarea.vue";

const install = Vue => {
    if (!Vue.options.components.RouterLink) {
        Vue.component("router-link", RouterLink);
    }
    Vue.component("error-platforme", ErrorPlatforme);
    Vue.component("global", Global);
    Vue.component("oauth", OAuth);
    Vue.component("alert", Alert);
    Vue.component("button-color", ButtonColor);
    Vue.component("button-icon", ButtonIcon);
    Vue.component("button-platforme", ButtonPlatforme);
    Vue.component("checkbox", Checkbox);
    Vue.component("container-platforme", Container);
    Vue.component("details-platforme", Details);
    Vue.component("dropdown", Dropdown);
    Vue.component("filter-platforme", Filter);
    Vue.component("footer-platforme", FooterPlatforme);
    Vue.component("form-input", FormInput);
    Vue.component("header-platforme", Header);
    Vue.component("image-platforme", Image);
    Vue.component("input-platforme", Input);
    Vue.component("label-platforme", Label);
    Vue.component("loader", loader);
    Vue.component("modal", Modal);
    Vue.component("lightbox", Lightbox);
    Vue.component("lineup", Lineup);
    Vue.component("link-ripe", Link);
    Vue.component("listing", Listing);
    Vue.component("overlay", Overlay);
    Vue.component("progress-bar", ProgressBar);
    Vue.component("radio", Radio);
    Vue.component("search", Search);
    Vue.component("side", Side);
    Vue.component("table-platforme", Table);
    Vue.component("tabs", Tabs);
    Vue.component("tag", Tag);
    Vue.component("textarea-platforme", Textarea);
};

export {
    RouterLink,
    ErrorPlatforme,
    Global,
    OAuth,
    Alert,
    ButtonColor,
    ButtonIcon,
    ButtonPlatforme,
    Checkbox,
    Container,
    Details,
    Dropdown,
    Filter,
    FormInput,
    FooterPlatforme,
    Header,
    Image,
    Input,
    Label,
    loader,
    Modal,
    Lightbox,
    Lineup,
    Link,
    Listing,
    Overlay,
    ProgressBar,
    Radio,
    Search,
    Side,
    Table,
    Tabs,
    Tag,
    Textarea,
    install
};

export default install;
