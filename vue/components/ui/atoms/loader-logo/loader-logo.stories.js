import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Loader Logo", module)
    .addDecorator(withKnobs)
    .add("Loader Logo", () => ({
        template: `
            <div>
                <loader-logo></loader-logo>
            </div>
        `
    }));
