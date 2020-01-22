import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, text, select } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Checkbox", () => ({
        props: {
            error: {
                default: boolean("Error", false)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            value: {
                default: boolean("Checked", false)
            },
            label: {
                default: text("Label", "Checkbox")
            },
            icon: {
                default: select(
                    "Icon",
                    {
                        Check: "check",
                        Minus: "minus"
                    },
                    "check"
                )
            },
            slots: {
                default: boolean("Slots", false)
            }
        },
        data: function() {
            return {
                valueData: this.value
            };
        },
        watch: {
            value(value) {
                this.valueData = value;
            }
        },
        template: `
            <div>
                <checkbox
                    v-bind:label="label"
                    v-bind:value.sync="valueData"
                    v-bind:disabled="disabled"
                    v-bind:error="error"
                    v-bind:icon="icon"
                >
                    <template v-slot:before-item="{ label, value }" v-if="slots">
                        <p>Custom before checkbox {{ label }}</p>
                    </template>
                    <template v-slot:after-item="{ label, value }" v-if="slots">
                        <p>Custom After checkbox {{ label }}</p>
                    </template>
                </checkbox>
                <p>Value: {{ valueData }}</p>
            </div>
        `
    }));
