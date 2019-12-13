import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Overlay", () => ({
        props: {
            visible: {
                default: boolean("Visible", true)
            }
        },
        template: "<overlay v-bind:visible='visible'></overlay>"
    }));
