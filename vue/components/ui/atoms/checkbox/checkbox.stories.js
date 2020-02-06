import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, text, select, number } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Checkbox", () => ({
        props: {
            disabled: {
                default: boolean("Disabled", false)
            },
            checked: {
                default: select(
                    "Checked",
                    {
                        Checked: true,
                        Unchecked: false,
                        Partial: "partial"
                    },
                    false
                )
            },
            label: {
                default: text("Label", "Checkbox")
            },
            icon: {
                default: select(
                    "Icon",
                    {
                        Check: "check",
                        Minus: "minus",
                        Smile: "happy-face"
                    },
                    "check"
                )
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
                <checkbox
                    v-bind:label="label"
                    v-bind:checked.sync="checkedData"
                    v-bind:disabled="disabled"
                    v-bind:icon="icon"
                    v-bind:size="size"
                    v-bind:variant="variant"
                />
                <p>Checked: {{ checkedData }}</p>
            </div>
        `
    }));
