import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Overlay", module)
    .addDecorator(withKnobs)
    .add("Overlay", () => ({
        props: {
            visible: {
                default: boolean("Visible", false)
            }
        },
        template: "<overlay-platforme v-bind:visible='visible'></overlay-platforme>"
    }));
