import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Components/Atoms/Entry", module)
    .addDecorator(withKnobs)
    .add("Entry", () => ({
        props: {
            title: {
                default: text("Title", "Title example")
            },
            value: {
                default: text("Value", "Value example")
            },
            link: {
                default: text("Link", "")
            }
        },
        template: `
            <entry
                v-bind:title="title"
                v-bind:value="value"
                v-bind:link="link"
            />
        `
    }));
