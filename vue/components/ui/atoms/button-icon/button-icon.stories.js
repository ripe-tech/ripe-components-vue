import { storiesOf } from "@storybook/vue";
import { withKnobs, number, select } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Icon", () => ({
        props: {
            icon: {
                default: select(
                    "Icon",
                    {
                        Close: "close",
                        "Zoom In": "zoom-in",
                        "Zoom Out": "zoom-out",
                        Chat: "chat",
                        Cart: "cart",
                        Walking: "walking"
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
                <button-icon v-bind:icon="icon" v-bind:color="color" v-bind:size="size" />
            </div>
        `
    }));
