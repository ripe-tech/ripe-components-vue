import { ErrorPart } from "./error-part/error-part.vue";
import { OAuthPart } from "./oauth-part/oauth-part.vue";

const install = Vue => {
    Vue.component("error-part", ErrorPart);
    Vue.component("oauth-part", OAuthPart);
};

export { ErrorPart, OAuthPart };

export default install;
