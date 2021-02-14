import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Input", module)
    .addDecorator(withKnobs)
    .add("Input", () => ({
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
            value: {
                default: text("Value", "This is a text")
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder")
            },
            type: {
                default: select(
                    "Input Type",
                    {
                        Text: "text",
                        URL: "url",
                        Number: "number"
                    },
                    "text"
                )
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            monospaced: {
                default: boolean("Monospaced", false)
            },
            ellipsis: {
                default: boolean("Ellipsis", true)
            },
            header: {
                default: text("Header", "Start Header")
            },
            footer: {
                default: text("Footer", "End Footer")
            },
            width: {
                default: number("Width", null)
            },
            minWidth: {
                default: number("Minimum Width", null)
            },
            height: {
                default: number("Height", null)
            },
            maxLength: {
                default: number("Max Length", null)
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
                <form-input
                    v-bind:header="header"
                    v-bind:footer="footer"
                >
                    <input-ripe
                        v-bind:variant="variant"
                        v-bind:border="border"
                        v-bind:value.sync="valueData"
                        v-bind:placeholder="placeholder"
                        v-bind:type="type"
                        v-bind:disabled="disabled"
                        v-bind:monospaced="monospaced"
                        v-bind:width="width"
                        v-bind:min-width="minWidth"
                        v-bind:height="height"
                        v-bind:maxLength="maxLength" />
                </form-input>
                <p>Text: {{ valueData }}</p>
            </div>
        `
    }));
