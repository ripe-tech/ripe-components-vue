import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Upload Area", () => ({
        props: {
            helloText: {
                default: text("Hello Text", "Hello from Upload Area")
            }
        },
        template:
            '<upload-area v-bind:hello-text="helloText" />'
    }));
