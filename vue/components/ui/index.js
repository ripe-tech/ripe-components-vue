import Animations from "./animations";
import Atoms from "./atoms";
import Molecules from "./molecules";
import Organisms from "./organisms";
import Templates from "./templates";

const install = Vue => {
    Vue.use(Animations);
    Vue.use(Atoms);
    Vue.use(Molecules);
    Vue.use(Organisms);
    Vue.use(Templates);
};

export * from "./animations";
export * from "./atoms";
export * from "./molecules";
export * from "./organisms";
export * from "./templates";

export default install;
