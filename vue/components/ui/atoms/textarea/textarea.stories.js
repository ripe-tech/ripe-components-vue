import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Textarea", () => ({
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
                    v-bind:id="id"
                    v-bind:header="header"
                    v-bind:footer="footer"
                    v-bind:error="error"
                    v-bind:warning="warning"
                    v-bind:success="success"
                >
                    <textarea-ripe
                        v-bind:id="id"
                        v-bind:value.sync="valueData"
                        v-bind:placeholder="placeholder"
                        v-bind:disabled="disabled"
                        v-bind:initial-width="initialWidth"
                        v-bind:initial-height="initialHeight"
                        v-bind:resize="resize"
                    />
                </form-input>
                <p>Text: {{ valueData }}</p>
            </div>
        `
    }));
