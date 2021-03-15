import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Image List", module)
    .addDecorator(withKnobs)
    .add("Image List", () => ({
        props: {
            items: {
                default: () => [
                    {
                        name: "Dummy Red",
                        imageUrl:
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200"
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
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200",
                        options: {
                            buttonProps: {
                                icon: "bin"
                            }
                        }
                    },
                    {
                        name: "Dummy Red 2",
                        imageUrl:
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200",
                        options: {
                            buttonProps: {
                                icon: "bin"
                            }
                        }
                    }
                    {
                        imageUrl:
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200",
                        options: {
                            buttonProps: {
                                icon: "bin"
                            }
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
                v-bind:highlight-index="highlightIndex"
                v-bind:animation-duration="animationDuration"
            />
        `
    }));
