import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Title", () => ({
        props: {
            text: {
                default: text("Text", "This is a title")
            },
            size: {
                default: select(
                    "Size",
                    {
                        Unset: null,
                        Medium: "medium"
                    },
                    null
                )
            }
        },
        template: `
            <div>
                <title-ripe v-bind:size="size">{{ text }}</title-ripe>
            </div>
        `
    }));
