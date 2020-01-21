import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Input Currency", () => ({
        props: {
            value: {
                default: number("Value", 50)
            },
            currency: {
                default: select(
                    "Currency",
                    {
                        USD: "USD",
                        EUR: "EUR",
                        JPY: "JPY",
                        CHF: "CHF"
                    },
                    "USD"
                )
            },
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: null,
                        Dark: "dark"
                    },
                    null
                )
            },
            border: {
                default: select(
                    "Border",
                    {
                        Unset: null,
                        Strong: "strong",
                        Thin: "thin"
                    },
                    "thin"
                )
            },
            align: {
                default: select(
                    "Align",
                    {
                        Unset: null,
                        Left: "left",
                        Center: "center",
                        Right: "right"
                    },
                    "right"
                )
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder")
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            height: {
                default: number("Height", null)
            },
            width: {
                default: number("Width", 300)
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
                <input-currency
                    v-bind:value.sync="valueData"
                    v-bind:height="height"
                    v-bind:width="width"
                    v-bind:align="align"
                    v-bind:border="border"
                    v-bind:variant="variant"
                    v-bind:disabled="disabled"
                    v-bind:placeholder="placeholder"
                    v-bind:currency="currency" />
                <p>Text: {{ valueData }}</p>
            </div>
        `
    }));
