import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Selector", () => ({
        props: {
            selectLabel: {
                default: text("Label", "Select one")
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
            <selector-platforme v-bind:items="items" v-bind:selectLabel="selectLabel"></selector-platforme>
        `
    }));
