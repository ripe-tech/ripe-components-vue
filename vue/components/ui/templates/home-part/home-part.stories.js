import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Templates/Home", module)
    .addDecorator(withKnobs)
    .add("Home", () => ({
        props: {
            logo: {
                default: text("Logo", "https://cdn.platforme.com/images/platforme.png")
            },
            illustration: {
                default: text(
                    "Illustration",
                    "https://assets-ouch.icons8.com/preview/230/0a740638-d82c-4ee1-a169-c32096e14e8a.png"
                )
            },
            message: {
                default: text("Message", "Welcome to RIPE XXXX\nyour number one place for RIPE")
            }
        },
        template: `
            <home-part
                v-bind:logo="logo"
                v-bind:illustration="illustration"
                v-bind:message="message"
            />
        `
    }));
