import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Link", () => ({
        props: {
            disabled: {
                default: boolean("Disabled", false)
            },
            color: {
                default: select(
                    "Color",
                    {
                        Black: "black",
                        Grey: "grey",
                        Orange: "orange",
                        Blue: "blue",
                        Green: "green",
                        Red: "red",
                        Purple: "purple"
                    },
                    "Blue"
                )
            }
        },
        template: `
            <div>
                <div><link-platforme v-bind:text='"This is a normal link"' v-bind:disabled='disabled' v-bind:color='color'></link-platforme></div>
                <div><link-platforme v-bind:text='"This is a small link"' v-bind:disabled='disabled' v-bind:size='"small" 'v-bind:color='color'></link-platforme></div>
            </div>
        `
    }));
