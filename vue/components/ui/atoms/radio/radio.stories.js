import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, text, select } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Radio", module)
    .addDecorator(withKnobs)
    .add("Radio", () => ({
        props: {
            label: {
                type: String,
                default: text("Label", "Label")
            },
            checked: {
                type: Boolean,
                default: boolean("Checked", false)
            },
            disabled: {
                type: Boolean,
                default: boolean("Disabled", false)
            },
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: null,
                        Error: "error"
                    },
                    null
                )
            }
        },
        template: `
            <radio
                v-bind:label="label"
                v-bind:checked="checked"
                v-bind:disabled="disabled"
                v-bind:variant="variant"
            />
        `
    }));
