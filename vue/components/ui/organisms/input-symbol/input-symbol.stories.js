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
            symbol: {
                default: text("Symbol", "€")
            },
            value: {
                default: text("Value", "This is a text")
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder")
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            header: {
                default: text("Header", "Start Header")
            },
            footer: {
                default: text("Footer", "End Footer")
            },
            errorText: {
                default: text("Error Text", "")
            },
            warning: {
                default: text("Warning", "")
            },
            success: {
                default: text("Success", "")
            },
            width: {
                default: number("Width", 100)
            },
            height: {
                default: number("Height", null)
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
                <form-input
                    v-bind:header="header"
                    v-bind:footer="footer"
                    v-bind:error="errorText"
                    v-bind:warning="warning"
                    v-bind:success="success"
                >
                    <input-symbol
                        v-bind:variant="variant"
                        v-bind:border="border"
                        v-bind:value.sync="valueData"
                        v-bind:placeholder="placeholder"
                        v-bind:disabled="disabled"
                        v-bind:width="width"
                        v-bind:height="height"
                        v-bind:symbol="symbol"
                        v-on:update:value="inputTime = new Date().getTime()"
                        v-on:focus="focusTime = new Date().getTime()"
                        v-on:blur="blurTime = new Date().getTime()"/>
                </form-input>
                <p>Text: {{ valueData }}</p>
                <p>Last wrote from user: {{ inputTime }}</p>
                <p>Last focus from user: {{ focusTime }}</p>
                <p>Last blur from user: {{ blurTime }}</p>
            </div>
        `
    }));
