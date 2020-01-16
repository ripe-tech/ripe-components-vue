import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
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
            symbol: {
                default: text("Symbol", "€")
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
                inputTime: null,
                focusTime: null,
                blurTime: null
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
                    v-bind:disabled="disabled"
                    v-bind:placeholder="placeholder"
                    v-bind:symbol="symbol"
                    v-on:update:value="inputTime = new Date().getTime()"
                    v-on:focus="focusTime = new Date().getTime()"
                    v-on:blur="blurTime = new Date().getTime()" />
                <p>Text: {{ valueData }}</p>
                <p>Last wrote from user: {{ inputTime }}</p>
                <p>Last focus from user: {{ focusTime }}</p>
                <p>Last blur from user: {{ blurTime }}</p>
            </div>
        `
    }));
