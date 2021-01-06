import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, select, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Scrollable Items", () => ({
        props: {
            items: {
                default: () => [
                    {
                        label: "Item Example 1",
                        value: "item1"
                    },
                    {
                        label: "Item Example 2",
                        value: "item2"
                    },
                    {
                        label: "Item Example 3",
                        value: "item3"
                    },
                    {
                        label: "Item Example 4",
                        value: "item4"
                    },
                    {
                        label: "Item Example 5",
                        value: "item5"
                    },
                    {
                        label: "Item Example 6",
                        value: "item6"
                    },
                    {
                        label: "Item Example 7",
                        value: "item7"
                    },
                    {
                        label: "Item Example 8",
                        value: "item8"
                    },
                    {
                        label: "Item Example 9",
                        value: "item9"
                    },
                    {
                        label: "Item Example 10",
                        value: "item10"
                    },
                    {
                        label: "Item Example 11",
                        value: "item11"
                    },
                    {
                        label: "Item Example 12",
                        value: "item12"
                    }
                ]
            },
            arrows: {
                default: boolean("Arrows", true)
            },
            autoHideArrows: {
                default: boolean("Auto Hide Arrows", false)
            },
            alignment: {
                default: select(
                    "Alignment",
                    {
                        Left: "left",
                        Right: "right",
                        Center: "center"
                    },
                    "center"
                )
            },
            scrollSpeed: {
                default: number("Scroll Speed", 10)
            }
        },
        data: function() {
            return {
                selected: null
            };
        },
        template: `
            <div>
                <scrollable-items
                    v-bind:items="items"
                    v-bind:selected.sync="selected"
                    v-bind:arrows="arrows"
                    v-bind:auto-hide-arrows="autoHideArrows"
                    v-bind:alignment="alignment"
                    v-bind:scroll-speed="scrollSpeed"
                />
                <div>Selected: {{ selected }}</div>
            </div>
        `
    }));
