import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select } from "@storybook/addon-knobs";

storiesOf("Components", module)
    .addDecorator(withKnobs)
    .add("Tag", () => ({
        props: {
            text: {
                default: text("Text", "This is a tag")
            },
            size: {
                default: select(
                    "Size",
                    {
                        Medium: "medium",
                        Small: "small",
                        Large: "large"
                    },
                    "medium"
                )
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
                    "black"
                )
            }
        },
        template: '<tag-platforme v-bind:size="size" v-bind:color="color" v-bind:text="text" />'
    }));
