import { ButtonPlatforme } from "./button-platforme/button-platforme.vue";
import { ContainerPlatforme } from "./container-platforme/container-platforme.vue";
import { DropdownPlatforme } from "./dropdown-platforme/dropdown-platforme.vue";
import { FilterPlatforme } from "./filter-platforme/filter-platforme.vue";
import { FooterPlatforme } from "./footer-platforme/footer-platforme.vue";
import { HeaderPlatforme } from "./header-platforme/header-platforme.vue";
import { LightboxPlatforme } from "./lightbox-platforme/lightbox-platforme.vue";
import { LoaderPlatforme } from "./loader-platforme/loader-platforme.vue";
import { OverlayPlatforme } from "./overlay-platforme/overlay-platforme.vue";
import { ProgressBarPlatforme } from "./progress-bar-platforme/progress-bar-platforme.vue";
import { SearchPlatforme } from "./search-platforme/search-platforme.vue";
import { SidePlatforme } from "./side-platforme/side-platforme.vue";
import { TablePlatforme } from "./table-platforme/table-platforme.vue";

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
    TablePlatforme
};

export default install;
