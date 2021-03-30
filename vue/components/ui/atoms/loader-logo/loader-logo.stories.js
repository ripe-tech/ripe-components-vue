import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Loader Logo", module)
    .addDecorator(withKnobs)
    .add("Loader Logo", () => ({
        props: {
            size: {
                default: number("Size", 60)
            }
        },
        template: `
            <div>
                <loader-logo v-bind:size="size"></loader-logo>
            </div>
        `
    }));
