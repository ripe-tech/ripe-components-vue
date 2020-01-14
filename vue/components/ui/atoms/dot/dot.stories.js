import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Dot", () => ({
        props: {
            value: {
                default: boolean("Value to indicate state", false)
            },
            size: {
                default: text("Size of the component", "20")
            }
        },
        template: `
            <div>
                <dot v-bind:value="value" v-bind:size="size" />
                <p>Values: {{ value }}</p>
            </div>
        `
    }));
