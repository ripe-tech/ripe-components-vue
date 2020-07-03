import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Textarea", () => ({
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
            header: {
                default: text("Description Text", "Description")
            },
            footer: {
                default: text("Help text", "Help or instruction text goes here")
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            monospaced: {
                default: boolean("Monospaced", false)
            },
            width: {
                default: number("Width", null)
            },
            height: {
                default: number("Height", null)
            },
            resize: {
                default: boolean("Resize", false)
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
                    <textarea-ripe
                        v-bind:variant="variant"
                        v-bind:border="border"
                        v-bind:value.sync="valueData"
                        v-bind:placeholder="placeholder"
                        v-bind:disabled="disabled"
                        v-bind:monospaced="monospaced"
                        v-bind:width="width"
                        v-bind:height="height"
                        v-bind:resize="resize"
                    />
                </form-input>
                <p>Text: {{ valueData }}</p>
            </div>
        `
    }));
