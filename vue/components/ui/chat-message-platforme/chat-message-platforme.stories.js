import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Chat", module)
    .addDecorator(withKnobs)
    .add("Chat Message", () => ({
        props: {
            hello: {
                default: text("Hello World", "Hello !!!")
            }
        },
        template: `
            <div>
                <chat-message-platforme
                    v-bind:hello="hello"
                />
            </div>
            `
    }));
