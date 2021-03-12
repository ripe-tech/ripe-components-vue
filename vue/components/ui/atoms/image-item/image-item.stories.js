import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Image Item", module)
    .addDecorator(withKnobs)
    .add("Image Item", () => ({
        props: {
            imageUrl: {
                default: text(
                    "Image URL",
                    "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200"
                )
            },
            name: {
                default: text("Name", "Dummy Cube")
            },
            height: {
                default: number("Height", null)
            },
            width: {
                default: number("Width", null)
            },
            showButton: {
                default: boolean("Show Button", true)
            },
            showName: {
                default: boolean("Show Name", true)
            },
            highlight: {
                type: Boolean,
                default: boolean("Highlight", false)
            },
            animationDuration: {
                type: Number,
                default: number("Animation Duration", 3000)
            }
        },
        template: `
            <image-item
                v-bind:image-url="imageUrl"
                v-bind:name="name"
                v-bind:height="height"
                v-bind:width="width"
                v-bind:show-button="showButton"
                v-bind:show-name="showName"
                v-bind:highlight="highlight"
                v-bind:animation-duration="animationDuration"
            />
        `
    }));
