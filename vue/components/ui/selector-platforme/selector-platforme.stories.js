import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Selector", () => ({
        props: {
            label: {
                default: text("Label", "Select one")
            },
            required: {
                default: boolean("Required", false)
            },
            width: {
                default: text("Width", "")
            },
            height: {
                default: text("Height", "")
            }
        },
        data() {
            return {
                items: [
                    {
                        id: "o1",
                        value: "opt1",
                        text: "White"
                    },
                    {
                        id: "o2",
                        value: "opt2",
                        text: "Yellow"
                    },
                    {
                        id: "o3",
                        value: "opt3",
                        text: "Red"
                    }
                ]
            };
        },
        template: `
            <selector-platforme v-bind:items="items" v-bind:width="width" v-bind:height="height" v-bind:label="label" v-bind:required="required"></selector-platforme>
        `
    }));
