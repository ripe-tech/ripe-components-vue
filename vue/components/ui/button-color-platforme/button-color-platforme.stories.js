import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Button Color", module)
    .addDecorator(withKnobs)
    .add("Button Color", () => ({
        props: {
            secondary: {
                default: boolean("Secondary", false)
            },
            color: {
                default: text("Color", "")
            }
        },
        template: `
            <div>
                <button-color-platforme v-bind:text="'Normal Button'" v-bind:secondary="secondary" v-bind:color="color"></button-color-platforme>
                <button-color-platforme v-bind:text="'Small Button'" v-bind:secondary="secondary" v-bind:small="true" v-bind:color="color"></button-color-platforme>
            </div>
        `
    }));
