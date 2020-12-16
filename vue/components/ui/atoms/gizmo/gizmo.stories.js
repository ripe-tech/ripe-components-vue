import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Gizmo", () => ({
        props: {},
        template: `
            <gizmo
            />
        `
    }));
