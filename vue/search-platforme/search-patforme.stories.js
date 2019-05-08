import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Search", () => ({
        props: {
            iconVisible: {
                default: boolean("Icon Visible", true)
            }
        },
        template: "<search-platforme v-bind:icon-visible='iconVisible'></search-platforme>"
    }));
