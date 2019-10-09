import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, text, select } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Generic", () => ({
        props: {
            type: {
                default: select(
                    "Type",
                    ["Text", "Number", "Email", "Password", "Tel", "Time", "Url", "Date", "Range", "Hidden"],
                    "Text"
                )
            },
            placeholder: {
                default: text("Placeholder", "Name")
            },
            width: {
                default: text("Width", "304")
            },
            height: {
                default: text("Height", "34")
            },
            required: {
                default: boolean("Required", false)
            },
            autofocus: {
                default: boolean("Autofocus", false)
            },
            iconVisible: {
                default: boolean("Has icon", true)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            iconSrc: {
                default: text(
                    "Icon URL",
                    "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg"
                )
            },
            value: {
                default: text("Initial Value", "")
            }
        },
        template: `
            <generic-field-platforme v-bind:value='value' v-bind:placeholder='placeholder'
            v-bind:required='required' v-bind:autofocus='autofocus'
            v-bind:type='type' v-bind:iconSrc='iconSrc' v-bind:iconVisible='iconVisible' v-bind:width='width' v-bind:height='height'
            v-bind:disabled='disabled'></generic-field-platforme>
        `
    }));
