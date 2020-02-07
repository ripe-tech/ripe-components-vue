import { storiesOf } from "@storybook/vue";
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Tag Group", () => ({
        props: {
            size: {
                default: select(
                    "Size",
                    {
                        Medium: "medium",
                        Small: "small",
                        Large: "large"
                    },
                    "medium"
                )
            },
            inputPlaceholder: {
                default: text("Input placeholder text", "Write and press enter...")
            },
            tags: {
                type: Array,
                default: () => ["WHITE", "SPUTNIK", "ORCHESTRA", "PULSE"]
            },
            hasInput: {
                default: boolean("Has input", true)
            },
            subtle: {
                default: boolean("Subtle", false)
            }
        },
        template:
            `<tag-group
                v-bind:hasInput="hasInput"
                v-bind:subtle="subtle"
                v-bind:size="size" v-bind:tags="tags"
                v-bind:input-placeholder="inputPlaceholder"
            />`
    }));
