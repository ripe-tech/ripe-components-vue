import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Checkbox", () => ({
        props: {
            disabled: {
                default: boolean("Disabled", false)
            },
            checked: {
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
            items: {
                default: () => [
                    {
                        label: "Japan",
                        value: "japan"
                    },
                    {
                        label: "Morocco",
                        value: "morocco"
                    },
                    {
                        value: "Canada"
                    },
                    {
                        value: "China"
                    },
                    {
                        label: "Dubai",
                        value: "dubai"
                    },
                    {
                        label: "Bali",
                        value: "bali",
                        disabled: true
                    },
                    {
                        label: "Tibet",
                        value: "tibet"
                    }
                ]
            }
        },
        data: function() {
            return {
                valuesData: {
                    japan: true,
                    China: true,
                    dubai: true,
                    Canada: true
                }
            };
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
