import { ErrorPart } from "./error-part/error-part.vue";
import { HomePart } from "./home-part/home-part.vue";
import { OAuthPart } from "./oauth-part/oauth-part.vue";

const install = Vue => {
    Vue.component("error-part", ErrorPart);
    Vue.component("home-part", HomePart);
    Vue.component("oauth-part", OAuthPart);
};

export { ErrorPart, HomePart, OAuthPart };

export default install;
