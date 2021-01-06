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
                        value: "button3"
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
