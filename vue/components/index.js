import Logic from "./logic";
import Ui from "./ui";
import Mock from "./mock";

const install = Vue => {
    Vue.use(Logic);
    Vue.use(Mock);
    Vue.use(Ui);
};

export * from "./logic";
export * from "./mock";
export * from "./ui";

export { install };

export default install;
