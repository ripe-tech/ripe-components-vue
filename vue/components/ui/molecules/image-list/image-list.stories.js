import { storiesOf } from "@storybook/vue";
import { withKnobs, number, select } from "@storybook/addon-knobs";

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
                            optionsItems: []
                        }
                    },
                    {
                        name: "Dummy Blue",
                        description: "A blue cube",
                        imageUrl:
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200"
                    },
                    {
                        name: "Dummy",
                        imageUrl:
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200"
                    },
                    {
                        name: "Dummy Red 2",
                        description: "A very red cube",
                        imageUrl:
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200",
                        options: {
                            optionsItems: [
                                {
                                    icon: "bin",
                                    iconColor: "red"
                                }
                            ]
                        }
                    },
                    {
                        imageUrl:
                            "https://ripe-core-sbx.platforme.com/api/compose?brand=dummy&format=png&frame=side-0&height=200&model=cube&p=shadow%3Adefault%3Adefault&p=side%3Aleather_cbe%3Ared&p=top0_bottom%3Aleather_cbe%3Ablack&width=200",
                        options: {
                            optionsItems: [
                                { label: "Item 1", value: "item_1", event: "item_1" },
                                { label: "Item 2", value: "item_2", event: "item_2" }
                            ]
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
                default: number("Animation Duration", 2000)
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
        methods: {
            onItemClick() {
                console.log("Item 1 clicked");
            }
        },
        template: `
            <image-list
                v-bind:items="items"
                v-bind:item-height="itemHeight"
                v-bind:item-width="itemWidth"
                v-bind:text-align="textAlign"
                v-bind:highlight-index="highlightIndex"
                v-bind:animation-duration="animationDuration"
                v-bind:options-items="optionsItems"
                v-on:click:option:item_1="onItemClick"
            />
        `
    }));
