import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, text, select } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Generic", () => ({
        props: {
            type: {
                default: select(
                    "Type",
                    [
                        "Text",
                        "Number",
                        "Email",
                        "Password",
                        "Tel",
                        "Time",
                        "Url",
                        "Date",
                        "Range",
                        "Hidden"
                    ],
                    "text"
                )
            },
            placeholder: {
                default: text("Placeholder Text", "Placeholder here")
            },
            required: {
                default: boolean("Is Required", false)
            },
            autofocus: {
                default: boolean("Autofocus", false)
            }
        },
        template: `
            <div>
                <generic-field-platforme v-bind:placeholder='placeholder' v-bind:required='required' v-bind:autofocus='autofocus' v-bind:type='type' ></generic-field-platforme>
            </div>
        `
    }));
