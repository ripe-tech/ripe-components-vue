import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Animations", module)
    .addDecorator(withKnobs)
    .add("Animations List", () => ({
        template: `
            <div>
                <h1>Animations List</h1>
            </div>
        `
    }));
