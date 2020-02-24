import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Templates", module)
    .addDecorator(withKnobs)
    .add("Home", () => ({
        props: {
            message: {
                default: text("Message", "Welcome to RIPE XXXX\nyour number one place for RIPE")
            }
        },
        template: `
            <home-part
                v-bind:message="message"
            />
        `
    }));
