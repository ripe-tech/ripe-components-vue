import { RouterLink } from "./mock/router-link/router-link.vue";
import { ErrorPlatforme } from "./parts/error-platforme/error-platforme.vue";
import { GlobalPlatforme } from "./parts/global-platforme/global-platforme.vue";
import { OAuthPlatforme } from "./parts/oauth-platforme/oauth-platforme.vue";
import { AlertPlatforme } from "./ui/alert-platforme/alert-platforme.vue";
import { ButtonColorPlatforme } from "./ui/button-color-platforme/button-color-platforme.vue";
import { ButtonIconPlatforme } from "./ui/button-icon-platforme/button-icon-platforme.vue";
import { ButtonPlatforme } from "./ui/button-platforme/button-platforme.vue";
import { ContainerPlatforme } from "./ui/container-platforme/container-platforme.vue";
import { DetailsPlatforme } from "./ui/details-platforme/details-platforme.vue";
import { DropdownPlatforme } from "./ui/dropdown-platforme/dropdown-platforme.vue";
import { FilterPlatforme } from "./ui/filter-platforme/filter-platforme.vue";
import { FooterPlatforme } from "./ui/footer-platforme/footer-platforme.vue";
import { HeaderPlatforme } from "./ui/header-platforme/header-platforme.vue";
import { ImagePlatforme } from "./ui/image-platforme/image-platforme.vue";
import { InputPlatforme } from "./ui/input-platforme/input-platforme.vue";
import { LabelPlatforme } from "./ui/label-platforme/label-platforme.vue";
import { LightboxPlatforme } from "./ui/lightbox-platforme/lightbox-platforme.vue";
import { LineupPlatforme } from "./ui/lineup-platforme/lineup-platforme.vue";
import { LinkPlatforme } from "./ui/link-platforme/link-platforme.vue";
import { ListingPlatforme } from "./ui/listing-platforme/listing-platforme.vue";
import { LoaderPlatforme } from "./ui/loader-platforme/loader-platforme.vue";
import { ModalPlatforme } from "./ui/modal-platforme/modal-platforme.vue";
import { OverlayPlatforme } from "./ui/overlay-platforme/overlay-platforme.vue";
import { ProgressBarPlatforme } from "./ui/progress-bar-platforme/progress-bar-platforme.vue";
import { SearchPlatforme } from "./ui/search-platforme/search-platforme.vue";
import { SidePlatforme } from "./ui/side-platforme/side-platforme.vue";
import { TablePlatforme } from "./ui/table-platforme/table-platforme.vue";
import { TabsPlatforme } from "./ui/tabs-platforme/tabs-platforme.vue";
import { TagPlatforme } from "./ui/tag-platforme/tag-platforme.vue";

const install = Vue => {
    if (!Vue.options.components.RouterLink) {
        Vue.component("router-link", RouterLink);
    }
    Vue.component("error-platforme", ErrorPlatforme);
    Vue.component("global-platforme", GlobalPlatforme);
    Vue.component("oauth-platforme", OAuthPlatforme);
    Vue.component("alert-platforme", AlertPlatforme);
    Vue.component("button-color-platforme", ButtonColorPlatforme);
    Vue.component("button-icon-platforme", ButtonIconPlatforme);
    Vue.component("button-platforme", ButtonPlatforme);
    Vue.component("container-platforme", ContainerPlatforme);
    Vue.component("details-platforme", DetailsPlatforme);
    Vue.component("dropdown-platforme", DropdownPlatforme);
    Vue.component("filter-platforme", FilterPlatforme);
    Vue.component("footer-platforme", FooterPlatforme);
    Vue.component("header-platforme", HeaderPlatforme);
    Vue.component("image-platforme", ImagePlatforme);
    Vue.component("input-platforme", InputPlatforme);
    Vue.component("label-platforme", LabelPlatforme);
    Vue.component("loader-platforme", LoaderPlatforme);
    Vue.component("modal-platforme", ModalPlatforme);
    Vue.component("lightbox-platforme", LightboxPlatforme);
    Vue.component("lineup-platforme", LineupPlatforme);
    Vue.component("link-platforme", LinkPlatforme);
    Vue.component("listing-platforme", ListingPlatforme);
    Vue.component("overlay-platforme", OverlayPlatforme);
    Vue.component("progress-bar-platforme", ProgressBarPlatforme);
    Vue.component("search-platforme", SearchPlatforme);
    Vue.component("side-platforme", SidePlatforme);
    Vue.component("table-platforme", TablePlatforme);
    Vue.component("tag-platforme", TagPlatforme);
    Vue.component("tabs-platforme", TabsPlatforme);
};

export {
    RouterLink,
    ErrorPlatforme,
    GlobalPlatforme,
    OAuthPlatforme,
    AlertPlatforme,
    ButtonColorPlatforme,
    ButtonIconPlatforme,
    ButtonPlatforme,
    ContainerPlatforme,
    DetailsPlatforme,
    DropdownPlatforme,
    FilterPlatforme,
    FooterPlatforme,
    HeaderPlatforme,
    ImagePlatforme,
    InputPlatforme,
    LabelPlatforme,
    LoaderPlatforme,
    ModalPlatforme,
    LightboxPlatforme,
    LineupPlatforme,
    LinkPlatforme,
    ListingPlatforme,
    OverlayPlatforme,
    ProgressBarPlatforme,
    SearchPlatforme,
    SidePlatforme,
    TablePlatforme,
    TabsPlatforme,
    TagPlatforme,
    install
};

export default install;
