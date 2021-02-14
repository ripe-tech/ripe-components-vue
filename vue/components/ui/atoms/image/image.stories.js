import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Image", module)
    .addDecorator(withKnobs)
    .add("Image", () => ({
        props: {
            src: {
                default: text("Source", "https://cdn.platforme.com/images/favicon.png")
            },
            srcError: {
                default: text(
                    "Source Error",
                    "https://cdn.platforme.com/images/platforme.square.png"
                )
            },
            alt: {
                default: text("Alt", "Platforme Logo")
            }
        },
        template: `
            <image-ripe
                v-bind:src="src"
                v-bind:src-error="srcError"
                v-bind:alt="alt"
            />
        `
    }));
