import { storiesOf } from "@storybook/vue";
import { withKnobs, array } from "@storybook/addon-knobs";

storiesOf("Logging Containter", module)
    .addDecorator(withKnobs)
    .add("Container", () => ({
        props: {
            entries: {
                default: array("Entries")
            }
        },
        template: `
    <div>
        <logging-container-platforme
            v-bind:entries="entries"
            />
    </div>
`
    }));
