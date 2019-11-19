import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select } from "@storybook/addon-knobs";

storiesOf("Components", module)
    .addDecorator(withKnobs)
    .add("Tag", () => ({
        props: {
            text: {
                default: text("Text", "This is a tag")
            },
            color: {
                default: select(
                    "Color",
                    {
                        Grey: "grey",
                        Orange: "orange",
                        Blue: "blue",
                        Green: "green",
                        Red: "red"
                    },
                    "grey"
                )
            }
        },
        template: '<tag-platforme v-bind:color="color" v-bind:text="text" />'
    }));
