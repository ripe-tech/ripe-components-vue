import { ButtonPlatforme } from "./ui/button-platforme/button-platforme.vue";
import { ContainerPlatforme } from "./ui/container-platforme/container-platforme.vue";
import { DropdownPlatforme } from "./ui/dropdown-platforme/dropdown-platforme.vue";
import { FilterPlatforme } from "./ui/filter-platforme/filter-platforme.vue";
import { FooterPlatforme } from "./ui/footer-platforme/footer-platforme.vue";
import { HeaderPlatforme } from "./ui/header-platforme/header-platforme.vue";
import { LightboxPlatforme } from "./ui/lightbox-platforme/lightbox-platforme.vue";
import { LoaderPlatforme } from "./ui/loader-platforme/loader-platforme.vue";
import { OverlayPlatforme } from "./ui/overlay-platforme/overlay-platforme.vue";
import { ProgressBarPlatforme } from "./ui/progress-bar-platforme/progress-bar-platforme.vue";
import { SearchPlatforme } from "./ui/search-platforme/search-platforme.vue";
import { SidePlatforme } from "./ui/side-platforme/side-platforme.vue";
import { TablePlatforme } from "./ui/table-platforme/table-platforme.vue";
import { OAuth } from "./parts/oauth/oauth.vue";

const install = Vue => {
    Vue.component("button-platforme", ButtonPlatforme);
    Vue.component("container-platforme", ContainerPlatforme);
    Vue.component("dropdown-platforme", DropdownPlatforme);
    Vue.component("filter-platforme", FilterPlatforme);
    Vue.component("footer-platforme", FooterPlatforme);
    Vue.component("header-platforme", HeaderPlatforme);
    Vue.component("loader-platforme", LoaderPlatforme);
    Vue.component("lightbox-platforme", LightboxPlatforme);
    Vue.component("overlay-platforme", OverlayPlatforme);
    Vue.component("progress-bar-platforme", ProgressBarPlatforme);
    Vue.component("search-platforme", SearchPlatforme);
    Vue.component("side-platforme", SidePlatforme);
    Vue.component("table-platforme", TablePlatforme);
    Vue.component("oauth", OAuth);
};

export {
    ButtonPlatforme,
    ContainerPlatforme,
    DropdownPlatforme,
    FilterPlatforme,
    FooterPlatforme,
    HeaderPlatforme,
    LoaderPlatforme,
    LightboxPlatforme,
    OverlayPlatforme,
    ProgressBarPlatforme,
    SearchPlatforme,
    SidePlatforme,
    TablePlatforme,
    OAuth,
    install
};

export default install;
