import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, number, text, select } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Textarea", () => ({
        props: {
            placeholder: {
                default: text("Placeholder", "Placeholder here")
            },
            maxLength: {
                default: number("Char limit", 1000)
            },
            resizable: {
                default: select("Resizable", ["Both", "Vertical", "Horizontal", "None"], "Both")
            },
            required: {
                default: boolean("Required", false)
            },
            autoFocus: {
                default: boolean("Autofocus", false)
            },
            cols: {
                default: number("Cols", 40)
            },
            rows: {
                default: number("Rows", 10)
            }
        },
        template: `
            <textarea-platforme v-bind:style="{resize: resizable}"
            v-bind:placeholder='placeholder' v-bind:resizable='resizable' 
            v-bind:maxLength='maxLength' v-bind:cols='cols' v-bind:rows='rows'
            v-bind:required='required' v-bind:autoFocus='autoFocus'></textarea-platforme>
        `
    }));
