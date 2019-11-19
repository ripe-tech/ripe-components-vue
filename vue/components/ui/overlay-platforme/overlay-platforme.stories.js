import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Overlay", module)
    .addDecorator(withKnobs)
    .add("Overlay", () => ({
        props: {
            visible: {
                default: boolean("Visible", true)
            }
        },
        template: "<overlay-platforme v-bind:visible='visible'></overlay-platforme>"
    }));
