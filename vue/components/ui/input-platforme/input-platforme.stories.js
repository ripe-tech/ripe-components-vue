import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Input", module)
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
                text: this.value
            };
        },
        methods: {
            onValue(value) {
                this.text = value;
            }
        },
        template: `
            <div>
                <form-input-platforme
                    v-bind:id="id"
                    v-bind:header="header"
                    v-bind:footer="footer"
                    v-bind:error="errorText"
                    v-bind:warning="warning"
                    v-bind:success="success"
                >
                    <input-platforme v-bind:value="value" v-bind:placeholder="placeholder" v-on:update:value="onValue" v-bind:disabled="disabled"></input-platforme>
                </form-input-platforme>
                <p>Text: {{ text }}</p>
            </div>
        `
    }));
