import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Input", () => ({
        props: {
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
                    <input-ripe v-bind:value.sync="valueData" v-bind:placeholder="placeholder" v-bind:disabled="disabled"></input-ripe>
                </form-input>
                <p>Text: {{ valueData }}</p>
            </div>
        `
    }));
