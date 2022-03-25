import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Code Editor", module)
    .addDecorator(withKnobs)
    .add("Code Editor", () => ({
        props: {
            value: {
                default: JSON.stringify({ example: "exemple text", "example number": 123 }, null, 4)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            type: {
                default: select(
                    "Type",
                    {
                        JSON: "json"
                    },
                    "json"
                )
            }
        },
        template: `
            <code-editor
                v-bind:value="value"
                v-bind:disabled="disabled"
                v-bind:type="type"
            />
        `
    }));
