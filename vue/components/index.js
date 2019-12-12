import { RouterLink } from "./mock/router-link/router-link.vue";
import { ErrorPlatforme } from "./parts/error-platforme/error-platforme.vue";
import { Global } from "./parts/global/global.vue";
import { OAuth } from "./parts/oauth/oauth.vue";
import { Alert } from "./ui/alert/alert.vue";
import { AvatarPlatforme } from "./ui/avatar-platforme/avatar-platforme.vue";
import { ButtonColor } from "./ui/button-color/button-color.vue";
import { ButtonIcon } from "./ui/button-icon/button-icon.vue";
import { ButtonPlatforme } from "./ui/button-platforme/button-platforme.vue";
import { Checkbox } from "./ui/checkbox/checkbox.vue";
import { ContainerPlatforme } from "./ui/container-platforme/container-platforme.vue";
import { DetailsPlatforme } from "./ui/details-platforme/details-platforme.vue";
import { Dropdown } from "./ui/dropdown/dropdown.vue";
import { FilterPlatforme } from "./ui/filter-platforme/filter-platforme.vue";
import { FooterPlatforme } from "./ui/footer-platforme/footer-platforme.vue";
import { FormInput } from "./ui/form-input/form-input.vue";
import { HeaderPlatforme } from "./ui/header-platforme/header-platforme.vue";
import { ImagePlatforme } from "./ui/image-platforme/image-platforme.vue";
import { InputPlatforme } from "./ui/input-platforme/input-platforme.vue";
import { LabelPlatforme } from "./ui/label-platforme/label-platforme.vue";
import { Lightbox } from "./ui/lightbox/lightbox.vue";
import { Lineup } from "./ui/lineup/lineup.vue";
import { LinkPlatforme } from "./ui/link-platforme/link-platforme.vue";
import { Listing } from "./ui/listing/listing.vue";
import { loader } from "./ui/loader/loader.vue";
import { Modal } from "./ui/modal/modal.vue";
import { Overlay } from "./ui/overlay/overlay.vue";
import { ProgressBar } from "./ui/progress-bar/progress-bar.vue";
import { Radio } from "./ui/radio/radio.vue";
import { Search } from "./ui/search/search.vue";
import { Side } from "./ui/side/side.vue";
import { TablePlatforme } from "./ui/table-platforme/table-platforme.vue";
import { Tabs } from "./ui/tabs/tabs.vue";
import { Tag } from "./ui/tag/tag.vue";
import { TextareaPlatforme } from "./ui/textarea-platforme/textarea-platforme.vue";

const install = Vue => {
    if (!Vue.options.components.RouterLink) {
        Vue.component("router-link", RouterLink);
    }
    Vue.component("error-platforme", ErrorPlatforme);
    Vue.component("global", Global);
    Vue.component("oauth", OAuth);
    Vue.component("alert", Alert);
    Vue.component("avatar-platforme", AvatarPlatforme);
    Vue.component("button-color", ButtonColor);
    Vue.component("button-icon", ButtonIcon);
    Vue.component("button-platforme", ButtonPlatforme);
    Vue.component("checkbox", Checkbox);
    Vue.component("container-platforme", ContainerPlatforme);
    Vue.component("details-platforme", DetailsPlatforme);
    Vue.component("dropdown", Dropdown);
    Vue.component("filter-platforme", FilterPlatforme);
    Vue.component("footer-platforme", FooterPlatforme);
    Vue.component("form-input", FormInput);
    Vue.component("header-platforme", HeaderPlatforme);
    Vue.component("image-platforme", ImagePlatforme);
    Vue.component("input-platforme", InputPlatforme);
    Vue.component("label-platforme", LabelPlatforme);
    Vue.component("loader", loader);
    Vue.component("modal", Modal);
    Vue.component("lightbox", Lightbox);
    Vue.component("lineup", Lineup);
    Vue.component("link-platforme", LinkPlatforme);
    Vue.component("listing", Listing);
    Vue.component("overlay", Overlay);
    Vue.component("progress-bar", ProgressBar);
    Vue.component("radio", Radio);
    Vue.component("search", Search);
    Vue.component("side", Side);
    Vue.component("table-platforme", TablePlatforme);
    Vue.component("tabs", Tabs);
    Vue.component("tag", Tag);
    Vue.component("textarea-platforme", TextareaPlatforme);
};

export {
    RouterLink,
    ErrorPlatforme,
    Global,
    OAuth,
    Alert,
    AvatarPlatforme,
    ButtonColor,
    ButtonIcon,
    ButtonPlatforme,
    Checkbox,
    ContainerPlatforme,
    DetailsPlatforme,
    Dropdown,
    FilterPlatforme,
    FormInput,
    FooterPlatforme,
    HeaderPlatforme,
    ImagePlatforme,
    InputPlatforme,
    LabelPlatforme,
    loader,
    Modal,
    Lightbox,
    Lineup,
    LinkPlatforme,
    Listing,
    Overlay,
    ProgressBar,
    Radio,
    Search,
    Side,
    TablePlatforme,
    Tabs,
    Tag,
    TextareaPlatforme,
    install
};

export default install;
