import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Calendar", module)
    .addDecorator(withKnobs)
    .add("Calendar", () => ({
        template: `
            <calendar />
        `
    }));
