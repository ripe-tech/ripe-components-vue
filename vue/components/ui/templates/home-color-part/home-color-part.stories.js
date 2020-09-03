import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select } from "@storybook/addon-knobs";

storiesOf("Templates", module)
    .addDecorator(withKnobs)
    .add("Home Color", () => ({
        props: {
            logo: {
                default: text("Logo", require("./logo.svg"))
            },
            illustration: {
                default: text("Illustration", require("./illustration.svg"))
            },
            background: {
                default: text("Background", require("./background.svg"))
            },
            message: {
                default: text("Message", "Welcome to the\nRIPE White Admin")
            },
            subMessage: {
                default: text(
                    "Sub Message",
                    "The place where you can create your\ncustomisations, gifts and much more."
                )
            },
            topColor: {
                default: select(
                    "Top Color",
                    {
                        Dark: "dark",
                        Light: "light"
                    },
                    "dark"
                )
            },
            middleColor: {
                default: select(
                    "Middle Color",
                    {
                        Dark: "dark",
                        Light: "light"
                    },
                    "dark"
                )
            },
            bottomColor: {
                default: select(
                    "Bottom Color",
                    {
                        Dark: "dark",
                        Light: "light"
                    },
                    "light"
                )
            },
            links: {
                default: () => [
                    {
                        name: "Products",
                        to: "https://www.platforme.com"
                    },
                    {
                        name: "Prices",
                        to: "https://www.platforme.com",
                        target: "_blank"
                    }
                ]
            }
        },
        template: `
            <div>
                <global />
                <home-color-part
                    v-bind:logo="logo"
                    v-bind:illustration="illustration"
                    v-bind:background="background"
                    v-bind:message="message"
                    v-bind:sub-message="subMessage"
                    v-bind:links="links"
                    v-bind:top-color="topColor"
                    v-bind:middle-color="middleColor"
                    v-bind:bottom-color="bottomColor"
                />
            </div>
        `
    }));
