import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Input Symbol", module)
    .addDecorator(withKnobs)
    .add("Input Symbol", () => ({
        props: {
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
            value: {
                default: text("Value", "This is a text")
            },
            type: {
                default: select(
                    "Type",
                    {
                        Unset: null,
                        Text: "text",
                        Number: "number",
                        Date: "date"
                    },
                    null
                )
            },
            symbol: {
                default: text("Symbol", "€")
            },
            symbolPosition: {
                default: select(
                    "Symbol Position",
                    {
                        Unset: null,
                        Left: "left",
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
                <input-symbol
                    v-bind:value.sync="valueData"
                    v-bind:height="height"
                    v-bind:width="width"
                    v-bind:align="align"
                    v-bind:border="border"
                    v-bind:variant="variant"
                    v-bind:type="type"
                    v-bind:disabled="disabled"
                    v-bind:placeholder="placeholder"
                    v-bind:symbol="symbol"
                    v-bind:symbol-position="symbolPosition" />
                <p>Text: {{ valueData }}</p>
                <p>Using Slots:</p>
                <input-symbol
                    v-bind:value.sync="valueData"
                    v-bind:height="height"
                    v-bind:width="width"
                    v-bind:align="align"
                    v-bind:border="border"
                    v-bind:variant="variant"
                    v-bind:type="type"
                    v-bind:disabled="disabled"
                    v-bind:placeholder="placeholder"
                    v-bind:symbol="symbol"
                    v-bind:symbol-position="symbolPosition">
                        <template v-slot:symbol-left>
                            <icon class="arrow arrow-previous" style="height: 34px; width: 34px;" v-bind:icon="'chevron-left'" />
                        </template>
                        <template v-slot:symbol-right>
                            <icon class="arrow arrow-next" style="height: 34px; width: 34px;" v-bind:icon="'chevron-right'" />
                        </template>
                </input-symbol>
                <p>Text: {{ valueData }}</p>
            </div>
        `
    }));
