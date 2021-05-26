import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Date Input", module)
    .addDecorator(withKnobs)
    .add("Date Input", () => ({
        props: {
            header: {
                default: boolean("Header", false)
            }
        },
        template: `
            <input-date v-bind:header="header" />
        `
    }));
