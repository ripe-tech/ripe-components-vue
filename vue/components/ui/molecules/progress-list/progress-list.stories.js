import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Progress List", () => ({
        props: {},
        template: `
            <div>
                <progress-list />
            </div>
        `
    }));
