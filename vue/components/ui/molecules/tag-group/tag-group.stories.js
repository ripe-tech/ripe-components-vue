import { storiesOf } from "@storybook/vue";
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Tag Group", () => ({
        props: {
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
            placeholder: {
                default: text("Placeholder", "Write and press enter...")
            },
            tags: {
                type: Array,
                default: () => ["WHITE", "SPUTNIK", "ORCHESTRA", "PULSE"]
            },
            editable: {
                default: boolean("Editable", true)
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
            }
        },
        template: `
            <tag-group
                v-bind:tags="tags"
                v-bind:editable="editable"
                v-bind:placeholder="placeholder"
                v-bind:size="size"
                v-bind:subtle="subtle"
                v-bind:color="color"
            />
        `
    }));
