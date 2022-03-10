import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, number, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Tooltip", module)
    .addDecorator(withKnobs)
    .add("Tooltip", () => ({
        props: {
            native: {
                default: boolean("Native", false)
            },
            text: {
                default: text("Text", "I think therefore I am")
            },
            visible: {
                default: boolean("Visible", false)
            },
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: undefined,
                        Dark: "dark",
                        Grey: "grey",
                        White: "white"
                    },
                    undefined
                )
            },
            fontSize: {
                default: number("Font Size", null)
            },
            orientation: {
                default: select(
                    "Tooltip Orientation",
                    {
                        Unset: undefined,
                        Top: "top",
                        Right: "right",
                        Bottom: "bottom",
                        Left: "left"
                    },
                    undefined
                )
            },
            width: {
                default: number("Width", null)
            },
            borderRadius: {
                default: text("Border Radius", "4px")
            },
            animation: {
                default: select(
                    "Animation",
                    {
                        Unset: undefined,
                        None: null,
                        Fade: "fade"
                    },
                    "fade"
                )
            },
            delay: {
                default: number("Delay", 1000)
            },
            hideDelay: {
                default: number("Hide Delay", 0)
            },
            duration: {
                default: number("Duration", 250)
            }
        },
        template: `
            <div style="margin:200px;">
                <tooltip
                    v-bind:text="text"
                    v-bind:visible="visible"
                    v-bind:variant="variant"
                    v-bind:font-size="fontSize"
                    v-bind:orientation="orientation"
                    v-bind:width="width"
                    v-bind:borderRadius="borderRadius"
                    v-bind:animation="animation"
                    v-bind:delay="delay"
                    v-bind:hide-delay="hideDelay"
                    v-bind:duration="duration"
                    v-bind:native="native"
                >
                    <div style="text-decoration:underline;cursor:pointer;">Hello, I am a underscored text.</div>
                    <template v-slot:tooltip-text>
                        This is custom text with HTML a <a href="#">link</a>
                    </template>
                </tooltip>
                <tooltip
                    v-bind:text="text"
                    v-bind:visible="visible"
                    v-bind:variant="variant"
                    v-bind:font-size="fontSize"
                    v-bind:orientation="orientation"
                    v-bind:width="width"
                    v-bind:borderRadius="borderRadius"
                    v-bind:animation="animation"
                    v-bind:delay="delay"
                    v-bind:hide-delay="hideDelay"
                    v-bind:duration="duration"
                    v-bind:native="native"
                >
                    <div style="height:50px;width:50px;background-color:Gold;cursor:pointer;">Hello, I am a Div.</div>
                </tooltip>
                <tooltip
                    v-bind:visible="visible"
                    v-bind:variant="variant"
                    v-bind:orientation="orientation"
                    v-bind:width="width"
                    v-bind:border-radius="borderRadius"
                    v-bind:animation="animation"
                    v-bind:delay="delay"
                    v-bind:hide-delay="hideDelay"
                    v-bind:duration="duration"
                    v-bind:native="native"
                    v-if="!native"
                >
                    <div style="height:50px;width:50px;background-color:MediumSpringGreen;cursor:pointer;">Hello, I am also a Div.</div>
                    <template v-slot:tooltip-content>
                        The only thing I know is that I know nothing
                        <image-ripe v-bind:width="200" v-bind:src="'https://cdn.platforme.com/images/platforme.png'" />
                    </template>
                </tooltip>
            </div>
        `
    }));
