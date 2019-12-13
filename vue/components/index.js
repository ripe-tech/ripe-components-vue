import Atoms from "./ui/atoms";
import Molecules from "./ui/molecules";

import { RouterLink } from "./mock/router-link/router-link.vue";
import { ErrorPart } from "./parts/error-part/error-part.vue";
import { Global } from "./parts/global/global.vue";
import { OAuthPart } from "./parts/oauth-part/oauth-part.vue";
import { Details } from "./ui/details/details.vue";
import { Filter } from "./ui/filter/filter.vue";
import { Header } from "./ui/header/header.vue";
import { Lineup } from "./ui/lineup/lineup.vue";
import { Listing } from "./ui/listing/listing.vue";
import { Side } from "./ui/side/side.vue";
import { Table } from "./ui/table/table.vue";
import { Tabs } from "./ui/tabs/tabs.vue";

const install = Vue => {
    Vue.use(Atoms);
    Vue.use(Molecules);

    if (!Vue.options.components.RouterLink) {
        Vue.component("router-link", RouterLink);
    }
    Vue.component("error-part", ErrorPart);
    Vue.component("global", Global);
    Vue.component("oauth-part", OAuthPart);
    Vue.component("details-ripe", Details);
    Vue.component("filter-ripe", Filter);
    Vue.component("header-ripe", Header);
    Vue.component("lineup", Lineup);
    Vue.component("listing", Listing);
    Vue.component("side", Side);
    Vue.component("table-ripe", Table);
    Vue.component("tabs", Tabs);
};

export * from "./ui/atoms";
export * from "./ui/molecules";

export {
    RouterLink,
    ErrorPart,
    Global,
    OAuthPart,
    Details,
    Filter,
    Header,
    Lineup,
    Listing,
    Side,
    Table,
    Tabs,
    install
};

export default install;
