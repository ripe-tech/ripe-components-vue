import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Code Editor", module)
    .addDecorator(withKnobs)
    .add("Code Editor", () => ({
        props: {},
        template: `
            <code-editor />
        `
    }));
