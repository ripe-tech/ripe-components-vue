import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Text Area", () => ({
        props: {
            id: {
                default: text("Id", "textarea-id")
            },
            value: {
                default: text("Value", "This is a text")
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder")
            },
            header: {
                default: text("Description text", "Description")
            },
            footer: {
                default: text("Help text", "Help or instruction text goes here")
            },
            error: {
                default: text("Error", "")
            },
            warning: {
                default: text("Warning", "")
            },
            success: {
                default: text("Success", "")
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            hover: {
                default: boolean("Hover", false)
            },
            focus: {
                default: boolean("Focus", false)
            },
            initialWidth: {
                default: number("Initial Width", 280)
            },
            initialHeight: {
                default: number("Initial Height", 98)
            },
            resize: {
                default: boolean("Resize", false)
            }
        },
        data: function() {
            return {
                textAreaText: this.value
            };
        },
        methods: {
            onValue(value) {
                this.textAreaText = value;
            }
        },
        template: `
            <div>
                <form-input-platforme
                    v-bind:id="id"
                    v-bind:header="header"
                    v-bind:footer="footer"
                    v-bind:error="error"
                    v-bind:warning="warning"
                    v-bind:success="success"
                >
                    <textarea-platforme
                        v-bind:id="id"
                        v-bind:value="value"
                        v-on:update:value="value => onValue(value)"
                        v-bind:placeholder="placeholder"
                        v-bind:disabled="disabled"
                        v-bind:hover="hover"
                        v-bind:focus="focus"
                        v-bind:initial-width="initialWidth"
                        v-bind:initial-height="initialHeight"
                        v-bind:resize="resize"
                    />
                </form-input-platforme>
                <p>Text: {{ textAreaText }}</p>
            </div>
        `
    }));
