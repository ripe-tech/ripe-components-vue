import { ButtonPlatforme } from "./button-platforme/button-platforme.vue";
import { ContainerPlatforme } from "./container-platforme/container-platforme.vue";
import { DropdownPlatforme } from "./dropdown-platforme/dropdown-platforme.vue";
import { FooterPlatforme } from "./footer-platforme/footer-platforme.vue";
import { HeaderPlatforme } from "./header-platforme/header-platforme.vue";
import { HelloPlatforme } from "./hello.vue";

const install = Vue => {
    Vue.component("button-platforme", ButtonPlatforme);
    Vue.component("container-platforme", ContainerPlatforme);
    Vue.component("dropdown-platforme", DropdownPlatforme);
    Vue.component("footer-platforme", FooterPlatforme);
    Vue.component("header-platforme", HeaderPlatforme);
    Vue.component("hello-platforme", HelloPlatforme);
};

export {
    ButtonPlatforme,
    ContainerPlatforme,
    DropdownPlatforme,
    FooterPlatforme,
    HeaderPlatforme,
    HelloPlatforme
};

export default install;
