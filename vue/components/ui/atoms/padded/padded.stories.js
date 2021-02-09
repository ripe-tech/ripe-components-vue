import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Padded", module)
    .addDecorator(withKnobs)
    .add("Padded", () => ({
        template: "<padded>This is padded content</padded>"
    }));
