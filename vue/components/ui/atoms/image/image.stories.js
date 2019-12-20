import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Image", () => ({
        props: {
            src: {
                default: text("Source", "https://cdn.platforme.com/images/favicon.png")
            },
            alt: {
                default: text("Alt", "Platforme Logo")
            }
        },
        template: '<image-ripe v-bind:src="src" v-bind:alt="alt"></image-ripe>'
    }));
