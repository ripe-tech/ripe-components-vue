import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
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
            disabled: {
                default: boolean("Disabled", false)
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
                default: number("Width", null)
            },
            minWidth: {
                default: number("Minimum width", null)
            },
            height: {
                default: number("Height", null)
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
                    v-bind:error="errorText"
                    v-bind:warning="warning"
                    v-bind:success="success"
                >
                    <input-ripe
                        v-bind:variant="variant"
                        v-bind:border="border"
                        v-bind:value.sync="valueData"
                        v-bind:placeholder="placeholder"
                        v-bind:disabled="disabled"
                        v-bind:width="width"
                        v-bind:min-width="minWidth"
                        v-bind:height="height"></input-ripe>
                </form-input>
                <p>Text: {{ valueData }}</p>
            </div>
        `
    }));
