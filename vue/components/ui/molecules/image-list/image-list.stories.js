import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Image List", module)
    .addDecorator(withKnobs)
    .add("Image List", () => ({
        props: {
            items: {
                default: () => [
                    {
                        name: "Dummy Red",
                        imageUrl:
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200",
                        options: {
                            showButton: false
                        }
                    },
                    {
                        name: "Dummy Blue",
                        imageUrl:
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200",
                        options: {
                            buttonProps: {
                                iconColor: "red",
                                icon: "rocket"
                            }
                        }
                    },
                    {
                        name: "Dummy",
                        imageUrl:
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200"
                    },
                    {
                        name: "Dummy Red 2",
                        imageUrl:
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200"
                    },
                    {
                        name: "Dummy Blue 3",
                        imageUrl:
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200",
                        options: {
                            showName: false
                        }
                    }
                ]
            },
            itemHeight: {
                default: number("Item Height", null)
            },
            itemWidth: {
                default: number("Item Width", null)
            },
            showButtons: {
                default: boolean("Show Buttons", true)
            },
            showNames: {
                default: boolean("Show Names", true)
            },
            highlightIndex: {
                type: Number,
                default: number("Highlight Index", undefined)
            },
            animationDuration: {
                type: Number,
                default: number("Animation Duration", 3000)
            }
        },
        template: `
            <image-list
                v-bind:items="items"
                v-bind:item-height="itemHeight"
                v-bind:item-width="itemWidth"
                v-bind:show-buttons="showButtons"
                v-bind:show-names="showNames"
                v-bind:highlight-index="highlightIndex"
                v-bind:animation-duration="animationDuration"
            />
        `
    }));
