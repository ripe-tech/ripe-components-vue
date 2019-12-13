import { Input } from "./input/input.vue";
import { Label } from "./label/label.vue";

const install = Vue => {
    Vue.component("input-ripe", Input);
    Vue.component("label-ripe", Label);
};

export {
    Input,
    Label
};

export default install;
