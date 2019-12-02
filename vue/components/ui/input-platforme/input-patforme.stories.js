import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Simple", () => ({
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
            error: {
                default: text("Error")
            },
            warning: {
                default: text("Warning")
            },
            success: {
                default: text("Success")
            }
        },
        template: `
            <input-platforme 
                v-bind:value='value' 
                v-bind:disabled='disabled' 
                v-bind:placeholder='placeholder'
                v-bind:error='error'
                v-bind:warning='warning'
                v-bind:success='success'
            />
        `
    }));
