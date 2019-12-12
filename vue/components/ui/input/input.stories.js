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
                <input-platforme v-bind:value="value" v-bind:placeholder="placeholder" v-on:update:value="onValue" v-bind:disabled="disabled"></input-platforme>
                <p>Text: {{ text }}</p>
            </div>
        `
    }));
