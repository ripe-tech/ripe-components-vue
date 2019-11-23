import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components", module)
    .addDecorator(withKnobs)
    .add("Label Value", () => ({
        props: {
            label: {
                type: String,
                default: text("Label", "Brand")
            },
            value: {
                type: String,
                default: text("Value", "Swear")
            },
            note: {
                type: String,
                default: text("Note", "Regent")
            }
        },
        template: `
            <label-value-platforme v-bind:label="label" v-bind:value="value" v-bind:note="note" />
        `
    }));
