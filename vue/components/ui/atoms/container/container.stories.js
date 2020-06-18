import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select } from "@storybook/addon-knobs";

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
            },
            title: {
                default: text("Title", "Container title")
            }
        },
        template: `
            <div>
                <global />
                <container-ripe
                    style='height: 200px'
                    v-bind:mode="mode"
                    v-bind:title="title"
                />
            </div>
        `
    }));
