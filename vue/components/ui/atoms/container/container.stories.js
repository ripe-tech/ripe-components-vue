import { storiesOf } from "@storybook/vue";
import { withKnobs, select } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Container", () => ({
        props: {
            mode: {
                default: select(
                    "Mode",
                    {
                        Default: "default",
                        Expanded: "expanded"
                    },
                    "default"
                )
            }
        },
        template: `
            <container-ripe
                style='height: 200px'
                v-bind:mode="mode"
            />
        `
    }));
