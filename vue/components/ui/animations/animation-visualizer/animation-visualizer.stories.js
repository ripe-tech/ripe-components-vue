import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Animations", module)
    .addDecorator(withKnobs)
    .add("Animations Visualizer", () => ({
        template: `
            <div>
                <h1>Animations Visualizer</h1>
            </div>
        `
    }));
