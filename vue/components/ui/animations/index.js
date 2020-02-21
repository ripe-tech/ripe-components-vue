import { AnimationVisualizer } from "./animation-visualizer/animation-visualizer.vue";

const install = Vue => {
    Vue.component("animation-visualizer", AnimationVisualizer);
};

export {
    AnimationVisualizer
};

export default install;
