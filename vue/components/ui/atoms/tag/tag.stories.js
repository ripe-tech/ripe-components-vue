import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Tag", module)
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
                        Large: "large",
                        Small: "small",
                        Tiny: "tiny"
                    },
                    "medium"
                )
            },
            subtle: {
                default: boolean("Subtle", false)
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
            },
            colorHex: {
                default: text("Color Hex", "")
            },
            textColor: {
                default: text("Text Color", "")
            }
        },
        template: `
            <tag
                v-bind:size="size"
                v-bind:subtle="subtle"
                v-bind:color="color"
                v-bind:color-hex="colorHex"
                v-bind:text-color="textColor"
                v-bind:text="text"
            />
        `
    }));
