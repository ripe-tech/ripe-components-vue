import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Calendar", module)
    .addDecorator(withKnobs)
    .add("Calendar", () => ({
        props: {
            header: {
                default: boolean("Header", false)
            }
        },
        template: `
            <calendar v-bind:header="header" />
        `
    }));
