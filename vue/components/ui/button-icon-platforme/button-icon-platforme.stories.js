import { storiesOf } from "@storybook/vue";
import { withKnobs, number, select } from "@storybook/addon-knobs";

storiesOf("Button", module)
    .addDecorator(withKnobs)
    .add("Icon", () => ({
        props: {
            icon: {
                default: select(
                    "Icon",
                    {
                        Close: "close",
                        "Zoom In": "zoom-in",
                        "Zoom Out": "zoom-out"
                    },
                    "close"
                )
            },
            color: {
                default: select(
                    "Color",
                    {
                        None: "",
                        Grey: "grey",
                        White: "white"
                    },
                    "grey"
                )
            },
            size: {
                default: number("Size", 30)
            }
        },
        template: `
            <div>
                <button-icon-platforme v-bind:icon="icon" v-bind:color="color" v-bind:size="size" />
            </div>
        `
    }));
