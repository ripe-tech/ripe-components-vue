import Logic from "./logic";
import Ui from "./ui";
import Mock from "./mock";

export const install = Vue => {
    Vue.use(Logic);
    Vue.use(Mock);
    Vue.use(Ui);
};

export * from "./logic";
export * from "./mock";
export * from "./ui";

export default install;
