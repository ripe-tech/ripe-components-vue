import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Checkmark", module)
    .addDecorator(withKnobs)
    .add("Checkmark", () => ({
        props: {
            value: {
                default: boolean("Value", false)
            },
            size: {
                default: number("Size", 14)
            }
        },
        template: `
            <checkmark v-bind:value="value" v-bind:size="size" />
        `
    }));
