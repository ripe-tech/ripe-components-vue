import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

import rates from "./assets/rates_example.json";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Input Currency", () => ({
        props: {
            value: {
                default: text("Value", "50")
            },
            currency: {
                default: select(
                    "Currency",
                    {
                        USD: "USD",
                        EUR: "EUR",
                        GBP: "GBP",
                        CRC: "CRC",
                        ILS: "ILS",
                        INR: "INR",
                        JPY: "JPY",
                        KRW: "KRW",
                        NGN: "NGN",
                        PHP: "PHP",
                        PLN: "PLN",
                        PYG: "PYG",
                        THB: "THB",
                        UAH: "UAH",
                        VND: "VND"
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
                valueData: this.value,
                rates: rates
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
                    v-bind:currency="currency"
                    v-bind:rates="rates" />
                <p>Text: {{ valueData }}</p>
            </div>
        `
    }));
