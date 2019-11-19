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
                        None: "",
                        Red: "red",
                        White: "white"
                    },
                    ""
                )
            }
        },
        template: `
            <div>
                <button-color-platforme v-bind:text="'Normal Button'" v-bind:secondary="secondary" v-bind:color="color"></button-color-platforme>
                <button-color-platforme v-bind:text="'Small Button'" v-bind:secondary="secondary" v-bind:small="true" v-bind:color="color"></button-color-platforme>
            </div>
        `
    }));
