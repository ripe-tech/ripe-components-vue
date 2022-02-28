import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Section Expandable", module)
    .addDecorator(withKnobs)
    .add("Section Expandable", () => ({
        props: {
            title: {
                default: text("Title", "Expandable Section Title")
            }
        },
        template: `
            <section-expandable-ripe v-bind:title="title">
                <h3> This is some text inside the expandable section. </h3>
                <p> And some smaller text. </p>
            </section-expandable-ripe>
        `
    }));
