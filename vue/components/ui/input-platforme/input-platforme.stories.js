import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Simple", () => ({
        props: {
            value: {
                default: text("Value", "This is a text")
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder")
            }
        },
        template:
            "<input-platforme v-bind:value='value' v-bind:placeholder='placeholder'></input-platforme>"
    }));
