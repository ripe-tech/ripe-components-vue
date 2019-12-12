import { storiesOf } from "@storybook/vue";
import { withKnobs, select, text } from "@storybook/addon-knobs";

storiesOf("Button", module)
    .addDecorator(withKnobs)
    .add("Reaction Icon", () => ({
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
                        None: null,
                        Walking: "walking"
                    },
                    null
                )
            },
            imgUrl: {
                default: text("Img URL", "https://a.slack-edge.com/production-standard-emoji-assets/10.2/apple-small/1f4aa@2x.png")
            },
            emoji: {
                default: text("Emoji", "")
            },
            count: {
                default: text("Count", "30")
            }
        },
        template: `
            <div>
                <reaction-icon-platforme v-bind:count="count" v-bind:imgUrl="imgUrl" v-bind:emoji="emoji" v-bind:icon="icon" />
            </div>
        `
    }));
