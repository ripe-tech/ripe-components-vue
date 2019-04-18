import { HelloPlatforme } from "./hello.vue";

const install = Vue => {
    Vue.component("hello-platforme", HelloPlatforme);
};

export { HelloPlatforme };

export default {
    install
};
