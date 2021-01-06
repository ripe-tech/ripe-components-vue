import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Scrollable Buttons", () => ({
        props: {
            items: {
                default: () => [
                    {
                        label: "Button 1",
                        value: "button1"
                    },
                    {
                        label: "Button 2",
                        value: "button2"
                    },
                    {
                        label: "Button 3",
                        value: "button3"
                    },
                    {
                        label: "Button 4",
                        value: "button4"
                    },
                    {
                        label: "Button 5",
                        value: "button5"
                    },
                    {
                        label: "Button 6",
                        value: "button6"
                    },
                    {
                        label: "Button 7",
                        value: "button7"
                    },
                    {
                        label: "Button 8",
                        value: "button8"
                    },
                    {
                        label: "Button 9",
                        value: "button9"
                    },
                    {
                        label: "Button 10",
                        value: "button10"
                    },
                    {
                        label: "Button 11",
                        value: "button11"
                    },
                    {
                        label: "Button 12",
                        value: "button12"
                    },
                    {
                        label: "Button 13",
                        value: "button13"
                    },
                    {
                        label: "Button 14",
                        value: "button14"
                    },
                    {
                        label: "Button 15",
                        value: "button15"
                    },
                    {
                        label: "Button 16",
                        value: "button16"
                    },
                    {
                        label: "Button 17",
                        value: "button17"
                    },
                    {
                        label: "Button 18",
                        value: "button18"
                    }
                ]
            }
        },
        template: `
            <scrollable-buttons
                v-bind:items="items"
            />
        `
    }));
