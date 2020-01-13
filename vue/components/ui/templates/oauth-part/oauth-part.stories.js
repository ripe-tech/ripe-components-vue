import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Templates", module)
    .addDecorator(withKnobs)
    .add("OAuth", () => ({
        props: {
            text: {
                default: text("Text", "Redirecting from Platforme ID ...")
            }
        },
        template: `
            <oauth-part v-bind:text="text" />
        `
    }));
