import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Progress List Item", () => ({
        props: {},
        template: `
            <div>
                <progress-list-item />
            </div>
        `
    }));
