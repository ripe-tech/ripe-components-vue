import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Templates", module)
    .addDecorator(withKnobs)
    .add("Home", () => ({
        props: {
            logo: {
                default: text("Logo", "https://cdn.platforme.com/images/favicon.png")
            },
            illustration: {
                default: text("Illustration", "https://cdn.platforme.com/images/favicon.png")
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
