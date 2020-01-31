import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, text, select, number } from "@storybook/addon-knobs";

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
            checked: {
                default: boolean("Checked", false)
            },
            label: {
                default: text("Label", "Checkbox")
            },
            value: {
                default: text("Value", "checkbox")
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
            },
            size: {
                default: number("Size", 4)
            }
        },
        data: function() {
            return {
                checkedData: this.checked
            };
        },
        watch: {
            checked(value) {
                this.checkedData = value;
            }
        },
        template: `
            <div>
                <checkbox-tick
                    v-bind:label="label"
                    v-bind:value="value"
                    v-bind:checked.sync="checkedData"
                    v-bind:disabled="disabled"
                    v-bind:error="error"
                    v-bind:icon="icon"
                    v-bind:size="size"
                >
                    <template v-slot:before-item="{ label, value, checked }" v-if="slots">
                        <p>Custom before checkbox {{ label }} with value {{ value }} and checked is {{ checked }}</p>
                    </template>
                    <template v-slot:after-item="{ label, value, checked }" v-if="slots">
                        <p>Custom After checkbox {{ label }}</p>
                    </template>
                </checkbox-tick>
                <p>Checked: {{ checkedData }}</p>
            </div>
        `
    }));
