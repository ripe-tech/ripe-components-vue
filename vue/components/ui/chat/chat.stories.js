import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Chat", module)
    .addDecorator(withKnobs)
    .add("Chat", () => ({
        props: {
            helloText: {
                default: text("Hello Text", "Hello")
            }
        },
        template: `
            <div style="width:100%;height:450px;">
                <chat v-bind:hello-text="helloText" />
            </div>
            `
    }));
