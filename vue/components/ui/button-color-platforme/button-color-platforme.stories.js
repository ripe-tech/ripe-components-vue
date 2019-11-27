import { storiesOf } from "@storybook/vue";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

storiesOf("Button", module)
    .addDecorator(withKnobs)
    .add("Color", () => ({
        props: {
            secondary: {
                default: boolean("Secondary", false)
            },
            color: {
                default: select(
                    "Color",
                    {
                        Default: "default",
                        Error: "red",
                        White: "white",
                        Blue: "blue",
                        Green: "green",
                        Yellow: "yellow",
                        Orange: "orange"
                    },
                    "default"
                )
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            loading: {
                default: boolean("Loading", false)
            }
        },
        template: `
            <div>
                <button-color-platforme v-bind:text="'Normal Button'" v-bind:secondary="secondary" v-bind:color="color"
                                        v-bind:disabled="disabled" v-bind:loading="loading"></button-color-platforme>
                <button-color-platforme v-bind:text="'Small Button'" v-bind:secondary="secondary" v-bind:color="color"
                                        v-bind:disabled="disabled" v-bind:loading="loading" v-bind:small="true" ></button-color-platforme>
            </div>
        `
    }));
