import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Section Expandable", module)
    .addDecorator(withKnobs)
    .add("Section Expandable", () => ({
        props: {
            title: {
                default: text("Title", "Section expandable title")
            },
            animated: {
                default: boolean("Animated", false)
            }
        },
        template: `
            <section-expandable v-bind:title="title" v-bind:animated="animated">
                <h3> This is some text inside the expandable section. </h3>
                <p> And some smaller text. </p>
            </section-expandable>
        `
    }));