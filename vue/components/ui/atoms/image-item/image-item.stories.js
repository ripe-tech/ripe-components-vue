import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, number, text, select } from "@storybook/addon-knobs";

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
            highlight: {
                type: Boolean,
                default: boolean("Highlight", false)
            },
            animationDuration: {
                type: Number,
                default: number("Animation Duration", 3000)
            },
            buttonProps: {
                default: () => ({
                    icon: "bin"
                })
            },
            textAlign: {
                default: select(
                    "Text Align",
                    {
                        Default: null,
                        Left: "left",
                        Right: "right",
                        Center: "center"
                    },
                    null
                )
            },
            optionsItems: {
                type: Array,
                default: () => [
                    { label: "Item 1", value: "item_1", event: "item_1" },
                    { label: "Item 2", value: "item_2", event: "item_2" },
                    { label: "Item 3", value: "item_3", separator: true, event: "item_3" },
                    { label: "Item 4", value: "item_4", event: "item_4" }
                ]
            }
        },
        template: `
            <image-item
                v-bind:image-url="imageUrl"
                v-bind:name="name"
                v-bind:height="height"
                v-bind:width="width"
                v-bind:text-align="textAlign"
                v-bind:highlight="highlight"
                v-bind:animation-duration="animationDuration"
                v-bind:button-props="buttonProps"
                v-bind:options-items="optionsItems"
            />
        `
    }));
