import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Textarea Code", module)
    .addDecorator(withKnobs)
    .add("Textarea Code", () => ({
        props: {
        },
        template: `
            <textarea-code />
        `
    }));
