import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Date Input", module)
    .addDecorator(withKnobs)
    .add("Date Input", () => ({
        template: `
            <input-date />
        `
    }));
