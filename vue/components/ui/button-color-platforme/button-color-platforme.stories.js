import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Button Color", module)
    .addDecorator(withKnobs)
    .add("Button Color", () => ({
        props: {
            text: {
                default: text("Text", "Ok")
            },
            secondary: {
                default: boolean("Secondary", false)
            }
        },
        template: `
            <div>
                <button-color-platforme v-bind:text="text" v-bind:secondary="secondary"></button-color-platforme>
            </div>
        `
    }));
