import { RouterLink } from "./mock/router-link/router-link.vue";
import { ErrorPlatforme } from "./parts/error-platforme/error-platforme.vue";
import { GlobalPlatforme } from "./parts/global-platforme/global-platforme.vue";
import { OAuthPlatforme } from "./parts/oauth-platforme/oauth-platforme.vue";
import { AlertPlatforme } from "./ui/alert-platforme/alert-platforme.vue";
import { ButtonColorPlatforme } from "./ui/button-color-platforme/button-color-platforme.vue";
import { ButtonPlatforme } from "./ui/button-platforme/button-platforme.vue";
import { ContainerPlatforme } from "./ui/container-platforme/container-platforme.vue";
import { DropdownPlatforme } from "./ui/dropdown-platforme/dropdown-platforme.vue";
import { FilterPlatforme } from "./ui/filter-platforme/filter-platforme.vue";
import { FooterPlatforme } from "./ui/footer-platforme/footer-platforme.vue";
import { HeaderPlatforme } from "./ui/header-platforme/header-platforme.vue";
import { ImagePlatforme } from "./ui/image-platforme/image-platforme.vue";
import { InputPlatforme } from "./ui/input-platforme/input-platforme.vue";
import { LightboxPlatforme } from "./ui/lightbox-platforme/lightbox-platforme.vue";
import { ListingPlatforme } from "./ui/listing-platforme/listing-platforme.vue";
import { LoaderPlatforme } from "./ui/loader-platforme/loader-platforme.vue";
import { ModalPlatforme } from "./ui/modal-platforme/modal-platforme.vue";
import { OverlayPlatforme } from "./ui/overlay-platforme/overlay-platforme.vue";
import { ProgressBarPlatforme } from "./ui/progress-bar-platforme/progress-bar-platforme.vue";
import { SearchPlatforme } from "./ui/search-platforme/search-platforme.vue";
import { SidePlatforme } from "./ui/side-platforme/side-platforme.vue";
import { TablePlatforme } from "./ui/table-platforme/table-platforme.vue";

const install = Vue => {
    if (!Vue.options.components.RouterLink) {
        Vue.component("router-link", RouterLink);
    }
    Vue.component("error-platforme", ErrorPlatforme);
    Vue.component("global-platforme", GlobalPlatforme);
    Vue.component("oauth-platforme", OAuthPlatforme);
    Vue.component("alert-platforme", AlertPlatforme);
    Vue.component("button-color-platforme", ButtonColorPlatforme);
    Vue.component("button-platforme", ButtonPlatforme);
    Vue.component("container-platforme", ContainerPlatforme);
    Vue.component("dropdown-platforme", DropdownPlatforme);
    Vue.component("filter-platforme", FilterPlatforme);
    Vue.component("footer-platforme", FooterPlatforme);
    Vue.component("header-platforme", HeaderPlatforme);
    Vue.component("image-platforme", ImagePlatforme);
    Vue.component("input-platforme", InputPlatforme);
    Vue.component("loader-platforme", LoaderPlatforme);
    Vue.component("modal-platforme", ModalPlatforme);
    Vue.component("lightbox-platforme", LightboxPlatforme);
    Vue.component("listing-platforme", ListingPlatforme);
    Vue.component("overlay-platforme", OverlayPlatforme);
    Vue.component("progress-bar-platforme", ProgressBarPlatforme);
    Vue.component("search-platforme", SearchPlatforme);
    Vue.component("side-platforme", SidePlatforme);
    Vue.component("table-platforme", TablePlatforme);
};

export {
    RouterLink,
    ErrorPlatforme,
    GlobalPlatforme,
    OAuthPlatforme,
    AlertPlatforme,
    ButtonColorPlatforme,
    ButtonPlatforme,
    ContainerPlatforme,
    DropdownPlatforme,
    FilterPlatforme,
    FooterPlatforme,
    HeaderPlatforme,
    ImagePlatforme,
    InputPlatforme,
    LoaderPlatforme,
    ModalPlatforme,
    LightboxPlatforme,
    ListingPlatforme,
    OverlayPlatforme,
    ProgressBarPlatforme,
    SearchPlatforme,
    SidePlatforme,
    TablePlatforme,
    install
};

export default install;
