import { storiesOf } from "@storybook/vue";
import { boolean } from "@storybook/addon-knobs";

storiesOf("Search", module).add("Default", () => ({
    props: {
        iconVisible: {
            default: boolean("Icon Visible", true)
        }
    },
    template: "<search-platforme></search-platforme>"
}));
