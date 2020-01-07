import { storiesOf } from "@storybook/vue";
import { withKnobs, number, select, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Animated Button Icon", () => ({
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
            animationIcon: {
                default: select(
                    "Animation Icon",
                    {
                        Ok: "ok",
                        Close: "close",
                        Ellypsis: "ellypsis"
                    },
                    "ok"
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
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            animationTimeout: {
                default: number("Animation Timeout", 500)
            }
        },
        template: `
            <animated-button-icon 
                v-bind:icon="icon" 
                v-bind:animationIcon="animationIcon" 
                v-bind:color="color" 
                v-bind:size="size" 
                v-bind:disabled="disabled"
                v-bind:animation-timeout="animationTimeout" />
        `
    }));
