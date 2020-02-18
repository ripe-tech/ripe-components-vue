import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Breadcrumbs", () => ({
        props: {},
        template: `
            <div>
                <breadcrumbs />
            </div>
        `
    }));
