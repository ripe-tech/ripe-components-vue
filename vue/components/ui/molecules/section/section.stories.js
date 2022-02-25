import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Section", module)
    .addDecorator(withKnobs)
    .add("Section", () => ({
        props: {
            title: {
                default: text("Title", "Section title")
            }
        },
        template: `
            <section-ripe
                v-bind:title="title"
            />
        `
    }));
